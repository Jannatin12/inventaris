import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(user: null) {
      this.user = user;
    }
  }
});