import { defineStore } from "pinia";
import { ref } from "vue";

const useUIStore = defineStore("ui", {
  state: () => ({
    visibleLeft: ref(false),
  }),
  getters: {},
  actions: {
    toggle() {
      this.visibleLeft = !this.visibleLeft;
    },
  },
});

export default useUIStore;
