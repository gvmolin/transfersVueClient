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
import type { ITransferDTO } from '@/utils/dto/transferDTO';
import type { ITransferModel } from '@/utils/models/transferModel';
import { ElNotification } from 'element-plus';
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

const { get, remove, post, put } = useAxios();

const transferList = ref<ITransferModel[]>();
const showForm = ref<boolean>(false);
let transferForm = ref<ITransferModel>({...INITIAL_TRANSFER_FORM});

onMounted(async()=>{
  await getTransfers();
})

watch(()=> transferForm.value, ()=>{
  console.log(transferForm.value)
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
  // if(validateTransfer()){
    await createTransfer();
    await getTransfers();
    showForm.value = false;
    transferForm.value = {...INITIAL_TRANSFER_FORM};
  // }
}

async function createTransfer(){
  await post(`/transfers/create`, buildCreateDto())
}

function buildCreateDto():ITransferDTO{
  return{
    originalValue: transferForm.value.originalValue,
    originAccountNumber: transferForm.value.accountOrigin?.accountNumber as string,
    destinationAccountNumber: transferForm.value.accountDestination?.accountNumber as string,
    scheduledDate: transferForm.value.scheduledDate
  }
}

async function deleteTransfer(id:string){
  await remove(`/transfers/delete/${id}`).then(res => {
    getTransfers();
  })
}

function validateTransfer(){
  // if(true) {

  //   return false;
  // }
  // return true;
}




</script>
