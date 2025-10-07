import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    user: {
      id: null,
      ename: null,
      aname: null,
      role: null,
      branch: null,
    },
  }),
  actions: {
    setUser(id, role, branch) {
      this.user.id = id;
      this.user.role = role;
      this.user.branch = branch;
    },
    setRole(role) {
      this.user.role = role;
    },
    setBranch(branch) {
      this.user.branch = branch;
    },
  },
});
