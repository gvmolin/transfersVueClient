import CadastroTransferenciasView from "@/views/CadastroTransferenciasView.vue";
import CadastroUsuariosView from "@/views/CadastroUsuariosView.vue";

const routes = [
  {
    path: '/cadastro/usuarios',
    name: 'cadastroUsuarios',
    component: CadastroUsuariosView
  },
  {
    path: '/cadastro/transferencias',
    name: 'cadastroTransferencias',
    component: CadastroTransferenciasView
  }
]

export default routes;

