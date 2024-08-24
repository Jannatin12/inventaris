import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    nip: '',
    password: '',
  }),
  actions: {
    login(nip: string, password: string) {
      this.nip = nip;
      this.password = password;
      // Handle successful login, e.g., redirecting to a dashboard
    },
    logout() {
      this.nip = '';
      this.password = '';
      // Handle logout, e.g., redirecting to the login page
    },
  },
});
