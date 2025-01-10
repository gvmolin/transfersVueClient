<template>
  <el-dialog v-model="props.show" title="Formulário de usuários" @close="emit('close')">
      
      <template #footer>
          <el-form ref="formRef" :model="props.form" label-width="auto"> 
              <el-form-item label="Nome" prop="name"><el-input v-model="props.form.name"/></el-form-item>
              <el-form-item v-if="!props.form.id" label="Valor Disponível" prop="balance" ><el-input-number :precision="2" :step="0.1" :min="0" v-model="props.form.balance" style="width: 100%;" /> </el-form-item>
          </el-form>
          <span class="dialog-footer">
              <el-button @click="emit('close')">Cancel</el-button>
              <el-button type="primary" @click="emit('submit')"> Confirm </el-button>
          </span>
      </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { IUserDTO } from '@/utils/dto/userDTO';
import { onMounted } from 'vue';

onMounted(()=>{

});

const props = defineProps<{
  show: boolean;
  form: IUserDTO;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit"): void;
}>();


</script>

