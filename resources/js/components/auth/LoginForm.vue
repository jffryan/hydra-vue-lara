<template>
  <div class="flex justify-center items-center">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-3xl">Sign in</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="sendLoginForm">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              name="username"
              type="username"
              autocomplete="username"
              v-model="loginForm.username"
              class="bg-hydra-cinder-800 appearance-none relative block w-full px-3 py-2 placeholder-gray-200 text-gray-200 rounded-md focus:z-10"
              placeholder="Username"
            />
            <p v-if="!isValid.username" class="p-2 text-red-300">
              Please enter your username
            </p>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              v-model="loginForm.password"
              class="bg-hydra-cinder-800 appearance-none relative block w-full px-3 py-2 placeholder-gray-200 text-gray-200 rounded-md focus:z-10"
              placeholder="Password"
            />
            <p v-if="!isValid.username" class="p-2 text-red-300">
              Please enter your password
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              v-model="loginForm.remember_token"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-white">
              Remember me
            </label>
          </div>
        </div>
        <div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { every } from "lodash";

import { useAuthStore } from "@/stores";

import validators from "@/utils/validators";

export default {
  name: "LoginForm",
  setup() {
    const AuthStore = useAuthStore();
    return { AuthStore };
  },
  data() {
    return {
      loginForm: this.initializeLoginForm(),
      isValid: {
        username: true,
        password: true,
      },
    };
  },
  computed: {
    isLoginValid() {
      return every(this.isValid);
    },
  },
  methods: {
    initializeLoginForm() {
      return {
        username: "",
        password: "",
        remember_token: false,
      };
    },
    validateLoginForm() {
      this.isValid.username = validators.validateString(
        this.loginForm.username
      );
      this.isValid.password = validators.validateString(
        this.loginForm.password
      );
    },
    async sendLoginForm() {
      // Validate first
      this.validateLoginForm();

      // If task is not valid, exit
      if (!this.isLoginValid) return;

      // Now the fun part begins
      if (!this.AuthStore.csrfCookieExists()) {
        await this.AuthStore.getCsrfCookie();
      }
      // Away we go
      this.sendLoginProcess();
    },
    async sendLoginProcess() {
      // Make sure we are a real user
      const response = await this.AuthStore.authenticateUserCredentials(
        this.loginForm
      );
      // Now that we are authenticated, we can finally login
      if (response.status === 200) {
        // This combines checking and setting the user
        await this.AuthStore.handleAuthenticatedLogin();
        this.$router.push({ name: "dashboard.home" });
      }
    },
  },
};
</script>
