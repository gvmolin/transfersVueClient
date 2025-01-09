import { createRouter, createWebHistory } from 'vue-router';
import CadastroUsuariosView from '@/views/CadastroUsuariosView.vue';
import CadastroTransferenciasView from '@/views/CadastroTransferenciasView.vue';
import routes from "./routes.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
