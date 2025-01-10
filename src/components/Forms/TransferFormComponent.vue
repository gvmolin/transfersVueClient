<template>
  <el-dialog v-model="props.show" title="Formulário de transferências" @close="emit('close')">

    <template #footer>
      <el-form ref="formRef" :model="props.form" label-width="auto">
        <el-form-item label="Conta de origem" prop="accountOrigin">
          <el-select v-model="accountOrigin">
            <el-option v-for="user in userList" :key="user.id" :value="user.id" :label="user.accountNumber"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Conta de Destino" prop="accountDestination">
          <el-select v-model="accountDestination">
            <el-option v-for="user in userList" :key="user.id" :value="user.id" :label="user.accountNumber" :disabled="(user.id === accountOrigin)"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Data de agendamento" prop="scheduledDate">
          <el-date-picker v-model="props.form.scheduledDate" format="DD/MM/YY" placeholder="Selecione a data"/>
        </el-form-item>

        <el-form-item label="Valor" prop="originalValue"><el-input-number :precision="2" :step="0.1" :min="0" v-model="props.form.originalValue" style="width: 100%;" /> </el-form-item>

      </el-form>
      <span class="dialog-footer">
        <el-button @click="emit('close')">Cancel</el-button>
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useAxios } from '@/composables/useAxios';
import type { ITransferModel } from '@/utils/models/transferModel';
import type { IUserModel } from '@/utils/models/userModel';
import { onMounted, ref, watch } from 'vue';

const userList = ref<IUserModel[]>();
const accountOrigin = ref<string>();
const accountDestination = ref<string>();

const props = defineProps<{
  show: boolean;
  form: ITransferModel;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit"): void;
}>();


const { get } = useAxios();

onMounted(async()=>{
  await getUsers();
});

watch(()=> accountOrigin.value, ()=>{
  console.log(accountOrigin.value)
})

watch(()=> props.form, ()=>{
  console.log(props.form)
})

function onSubmit(){
  props.form.accountDestination = userList.value?.find(el => el.id === accountDestination.value);
  props.form.accountOrigin = userList.value?.find(el => el.id === accountOrigin.value);
  console.log(props.form);
  emit("submit");
}

async function getUsers(){
  await get("/users/get?size=100").then(res => {
    const resList = res.content as IUserModel[];
    userList.value = resList;
  })
}



</script>

