import { defineStore } from "pinia";

export const useSideBarStore = defineStore("SideBarStore", {
  state: () => ({
    isSidebarOpen: true,
  }),

  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  },
});
