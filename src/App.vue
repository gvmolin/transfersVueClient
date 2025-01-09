<template>
  <HeaderComponent />

  <div class="mobile-button-container">
    <el-button v-if="screenWidth < 1024" @click="menuStore.swapActive()" type="primary"><font-awesome-icon :icon="['fas', 'bars']" /></el-button>
  </div>
  <div :class="`container ${menuStore.active ? '' : 'hidden'}`">
    <RouterView />
  </div>

</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import HeaderComponent from './components/Header/HeaderComponent.vue';
import { useMenuStore } from './stores/menu';
import { onMounted, ref } from 'vue';

const menuStore = useMenuStore();
const screenWidth = ref<number>(window.innerWidth);
const router = useRouter();

onMounted(() => {
    const currentRoute = router.currentRoute;
    if(currentRoute.value.path !== "/cadastro/usuarios" && currentRoute.value.path !== "/cadastro/transferencias") router.push("/cadastro/usuarios")
    console.log(currentRoute.value);
})

</script>

<style scoped lang="scss">
@import '/src/assets/variables.scss';

.container {
  padding: $defaultPadding;
  padding-left: calc($menuWidth + (3 * $defaultPaddingHor));
  transition: 1s;
}

.hidden {
  padding-left: calc(5 * $defaultPaddingHor);
  transition: 1s;
}
.mobile-button-container {
  position: fixed;
  top: $defaultPaddingVer;
  right: $defaultPaddingVer;
}
</style>
