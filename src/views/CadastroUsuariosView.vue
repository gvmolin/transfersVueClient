<template>
  <div>
    <h2>Cadastro de usuários</h2>
    <div style="margin-top: 3vh;">
      <el-button type="primary" style="margin-bottom: 1vh;" @click="onClickAdicionar">Adicionar &nbsp; <font-awesome-icon :icon="['fas', 'plus']" /></el-button>
      <el-table :data="userList" style="width: 100%; margin-top: vh;">
        <el-table-column prop="name" label="Nome" width="180" />
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
              <el-button size="small" type="danger" @click="deleteUser(scope.row.id)" style="width: 120px">Deletar &nbsp; <font-awesome-icon :icon="['fas', 'x']" /></el-button>
              <el-button size="small" type="primary" @click="onClickUpdate({...scope.row})" style="width: 120px; margin: 0; margin-top: 5px;" >Atualizar &nbsp; <font-awesome-icon :icon="['fas', 'pen']" /></el-button>
            </div>

          </template>  
        </el-table-column>
      </el-table>
    </div>

    <UserFormComponent :show="showForm" :form="userForm" @close="showForm = false" @submit="onSubmit" />
  </div>

</template>

<script setup lang="ts">
import UserFormComponent from '@/components/Forms/UserFormComponent.vue';
import { useAxios } from '@/composables/useAxios';
import { formatarData } from '@/utils/date/dateUtils';
import type { IUserDTO } from '@/utils/dto/userDTO';
import type { IUserModel } from '@/utils/models/userModel';
import { ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';

const INITIAL_USER_FORM:IUserModel = {
  name: "",
  accountNumber: "",
  balance: 0
}

const { get, remove, post, put } = useAxios();

const userList = ref<IUserModel[]>();
const showForm = ref<boolean>(false);
let userForm = ref<IUserDTO>({...INITIAL_USER_FORM});

onMounted(async()=>{
  await getUsers();
})

function onClickAdicionar(){
  userForm.value = {...INITIAL_USER_FORM};
  showForm.value = true;
}

function onClickUpdate(user: IUserDTO){
  userForm.value = user;
  showForm.value = true;
}

async function getUsers(){
  await get("/users/get?size=100").then(res => {
    const resList = res.content as IUserModel[];
    userList.value = resList;
  })
}

async function onSubmit() {
  if(validateUser()){
    !userForm.value.id?.length ? await createUser() : await updateUser(userForm.value.id as string);
    await getUsers();
    showForm.value = false;
    userForm.value = {...INITIAL_USER_FORM};
  }
}

async function createUser(){
  await post(`/users/create`, buildCreateDto())
}

function buildCreateDto():IUserDTO{
  return{
    balance: userForm.value.balance,
    name:userForm.value.name
  }
}

async function updateUser(id:string){
  await put(`/users/update/${id}`, userForm.value);
}

async function deleteUser(id:string){
  await remove(`/users/delete/${id}`).then(res => {
    getUsers();
  })
}

function validateUser():boolean{
  if(userForm.value.name.length <= 8) {
    ElNotification({
      message:"Usuário deve ter no mínimo 8 caracteres"
    })
    return false;
  }
  return true;
}




</script>

<style lang="scss" scoped>


</style>
