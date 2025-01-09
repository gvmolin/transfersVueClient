import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', () => {
  const active = ref<boolean>(false);

  function swapActive() {
    active.value = !active.value;
  }

  return { active, swapActive };
});
