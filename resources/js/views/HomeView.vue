<template>
  <main>
    <div class="flex">
      <div class="w-1/2">
        <div class="flex justify-center flex-col mb-6">
          <h1 class="text-6xl font-bold">Hydra</h1>
          <p class="text-3xl">Task management</p>
          <p class="text-xl">v 0.1.1</p>
        </div>
        <div>
          <router-link
            v-if="!isLoggedIn"
            :to="{ name: 'login' }"
            class="btn btn-primary inline-block"
            >Login</router-link
          >
        </div>
      </div>
      <div class="w-1/2">
        <figure class="droplet">
          <img src="/images/hydra4.jpg" alt="Hydra" />
        </figure>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from "@/stores";

export default {
  name: "HomeView",
  setup() {
    const AuthStore = useAuthStore();

    return {
      AuthStore,
    };
  },
  computed: {
    isLoggedIn() {
      return this.AuthStore.isLoggedIn;
    },
  },
};
</script>
