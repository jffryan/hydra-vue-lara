import { defineStore } from "pinia";
import axios from "axios";

const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    csrfCookieExists() {
      return document.cookie
        .split(";")
        .some((item) => item.trim().startsWith("XSRF-TOKEN="));
    },
    async getCsrfCookie() {
      try {
        const response = await axios.get("/sanctum/csrf-cookie");
        return response;
      } catch (error) {
        return error.response;
      }
    },
    async authenticateUserCredentials(loginForm) {
      const { username, password, remember_token } = loginForm;
      try {
        const response = await axios.post("/api/login", {
          username,
          password,
          remember_token,
        });
        return response;
      } catch (error) {
        return error.response;
      }
    },
    async checkAuthentication() {
      try {
        const response = await axios.get("/api/user");
        return response;
      } catch (error) {
        this.isAuthenticated = false;
        this.user = null;
        return error;
      }
    },
    setLogin(user) {
      this.isAuthenticated = true;
      this.user = user;
    },
    // logout() {
    //   this.user = null;
    //   this.token = null;
    // },
    async handleAuthenticatedLogin() {
      const response = await this.checkAuthentication();
      if (response.status === 200 && response.data) {
        this.setLogin(response.data);
      }
    },
  },
});

export default useAuthStore;
