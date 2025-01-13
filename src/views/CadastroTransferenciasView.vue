<template>
  <div>
    <h2>Cadastro de transferências</h2>
    <div style="margin-top: 3vh;">
      <el-button type="primary" style="margin-bottom: 1vh;" @click="onClickAdicionar">Adicionar &nbsp; <font-awesome-icon :icon="['fas', 'plus']" /></el-button>
      <el-table :data="transferList" style="width: 100%; margin-top: vh;">
        <el-table-column prop="accountOrigin" label="Conta de origem"> 
          <template #default="scope:{row: ITransferModel}"> {{ scope.row.accountOrigin?.accountNumber }}</template>  
        </el-table-column>

        <el-table-column prop="accountDestination" label="Conta de destino"> 
          <template #default="scope:{row: ITransferModel}"> {{ scope.row.accountDestination?.accountNumber }}</template>  
        </el-table-column>

        <el-table-column prop="originalValue" label="Valor original"> 
          <template #default="scope:{row: ITransferModel}">{{ "R$" + scope.row.originalValue.toFixed(2) }}</template>
        </el-table-column>

        <el-table-column prop="scheduledDate" label="Agendado para">
          <template #default="scope:{row: ITransferModel}"> {{ formatarData(scope.row.scheduledDate) }}</template>  
        </el-table-column>

        <el-table-column prop="fee" label="Taxa"> 
          <template #default="scope:{row: ITransferModel}">{{ "R$" + scope.row.fee.toFixed(2) }}</template>
        </el-table-column>

        <el-table-column prop="finalValue" label="Valor final"> 
          <template #default="scope:{row: ITransferModel}">{{ "R$" + scope.row.finalValue.toFixed(2) }}</template>
        </el-table-column>

        <el-table-column prop="attempts" label="Tentativas realizadas" />
        <el-table-column prop="status" label="Status" />


        <el-table-column label="Operações"> 
          <template #default="scope"  >  
            <div style="display: flex; width: 100%; flex-direction: column; align-items: center; justify-content: center;">
              <el-button size="small" type="danger" @click="deleteTransfer(scope.row.id)" style="width: 120px">Deletar &nbsp; <font-awesome-icon :icon="['fas', 'x']" /></el-button>
            </div>

          </template>  
        </el-table-column>
          
        <!-- <el-table-column prop="name" label="Nome" width="180" />
        <el-table-column prop="accountNumber" label="Número da conta" width="180"/>
        <el-table-column prop="balance" label="Valor em conta"> 
          <template #default="scope">{{ "R$" + scope.row.balance.toFixed(2) }}</template>
        </el-table-column>

        <el-table-column prop="created" label="Criado em" width="180">
          <template #default="scope"> {{ formatarData(scope.row.created) }}</template>  
        </el-table-column>

        <el-table-column label="Operações" width="180"> 
          <template #default="scope"  >  
            <div style="display: flex; width: 100%; flex-direction: column; align-items: center; justify-content: center;">
              <el-button size="small" type="danger" @click="deleteTransfer(scope.row.id)" style="width: 120px">Deletar &nbsp; <font-awesome-icon :icon="['fas', 'x']" /></el-button>
              <el-button size="small" type="primary" @click="onClickUpdate({...scope.row})" style="width: 120px; margin: 0; margin-top: 5px;" >Atualizar &nbsp; <font-awesome-icon :icon="['fas', 'pen']" /></el-button>
            </div>

          </template>  
        </el-table-column> -->
      </el-table>
    </div>

    <TransferFormComponent :show="showForm" :form="transferForm" @close="showForm = false" @submit="onSubmit" />
  </div>

</template>

<script setup lang="ts">
import TransferFormComponent from '@/components/Forms/TransferFormComponent.vue';
import { useAxios } from '@/composables/useAxios';
import { formatarData } from '@/utils/date/dateUtils';
import type { ICheckFeeDTO } from '@/utils/dto/checkFeeDTO';
import type { ITransferDTO } from '@/utils/dto/transferDTO';
import type { ITransferModel } from '@/utils/models/transferModel';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { onMounted, ref, watch } from 'vue';

const INITIAL_TRANSFER_FORM:ITransferModel = {
  finalValue: 0,
  originalValue: 0,
  accountOrigin: undefined,
  accountDestination: undefined,
  scheduledDate:"",
  fee: 0,
  attempts: 0,
  status: ""
}

const { get, remove, post } = useAxios();

const transferList = ref<ITransferModel[]>();
const showForm = ref<boolean>(false);
let transferForm = ref<ITransferModel>({...INITIAL_TRANSFER_FORM});

onMounted(async()=>{
  await getTransfers();
})

watch(()=> transferForm.value, ()=>{


})

function onClickAdicionar(){
  transferForm.value = {...INITIAL_TRANSFER_FORM};
  showForm.value = true;
}


async function getTransfers(){
  await get("/transfers/get?size=100").then(res => {
    const resList = res.content as ITransferModel[];
    transferList.value = resList;
  })
}

async function onSubmit() {
  try {
    const dto = buildCreateDto();
    const checkFeeData = await checkFee(dto);

    ElMessageBox.confirm(createConfirmString(checkFeeData), 'Confirmação de valores', {
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      dangerouslyUseHTMLString: true,
    })
      .then(async () => {
        const isValid = validateTransfer(dto, checkFeeData);
        if (isValid) {
          await createTransfer(dto);
          await getTransfers();
          showForm.value = false;
          transferForm.value = { ...INITIAL_TRANSFER_FORM };
        }
      })
      .catch((error: any) => {
        throw new Error("Operação cancelada");
      })


  } catch (error: any) {
    console.error(error);
    ElNotification({
      message: error.message || "Erro ao submeter dados",
      type: "error",
      duration: 1000
    })
    return;
  }
}

async function checkFee(dto: ITransferDTO): Promise<ICheckFeeDTO> {
  try {
    const obj = await post(`/transfers/check-fee`, dto);

    return obj;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}

function createConfirmString(checkFeeObj:ICheckFeeDTO): string{
  return `
    <p>Saldo da conta de origem: ${transferForm.value.accountOrigin?.balance} <br>
    Valor original da transferencia: ${transferForm.value.originalValue} <br>
    Taxa de transferência: ${checkFeeObj.fee} <br>
    Valor final da transferência: ${checkFeeObj.finalValue} </p>
  `
}

async function createTransfer(dto:ITransferDTO){
  await post(`/transfers/create`, dto);
}

function buildCreateDto():ITransferDTO{
  return{
    originalValue: transferForm.value.originalValue,
    originAccountNumber: transferForm.value.accountOrigin?.accountNumber as string,
    destinationAccountNumber: transferForm.value.accountDestination?.accountNumber as string,
    scheduledDate: transferForm.value.scheduledDate
  };
}

async function deleteTransfer(id:string){
  await remove(`/transfers/delete/${id}`).then(res => {
    getTransfers();
  })
}

function validateTransfer(dto:ITransferDTO, checkedFeeData:ICheckFeeDTO):boolean{
  if(!dto.originalValue || !dto.originAccountNumber || !dto.destinationAccountNumber || !dto.scheduledDate) {
    console.error("Dados faltando")
    return false;
  } else if (!validateDate(dto.scheduledDate)){
    console.error("Data de agendamento inválida")
    return false;
  } else if (!validateFee(checkedFeeData)){
    console.error("Falha na validação de taxa")
    return false;
  }
  return true;
}

function validateFee(checkedFeeData:ICheckFeeDTO):boolean{
  if(!transferForm.value.accountOrigin?.balance || transferForm.value.accountOrigin?.balance < checkedFeeData.finalValue){
    ElNotification({
      message:"O saldo da conta de origem é insuficiente",
      type:"error",
      duration:3000
    })
    return false;
  }
  return true;
}

function validateDate(stringDate:string):boolean{
  const date = new Date(stringDate);
  const today = Date.now();
  const todayDate = new Date(today);

  todayDate.setHours(0);
  todayDate.setMinutes(0);
  todayDate.setSeconds(0);
  todayDate.setMilliseconds(0);

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  if (date.getTime() < todayDate.getTime()){
    ElNotification({
      message:"Data inválida",
      type:"error",
      duration:3000
    })
    return false
  };

  return true;
}




</script>
