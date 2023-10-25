<template>
  <div>
    <div class="w-1/2">
      <LoginForm class="bg-hydra-cinder-600 py-8 px-4 rounded-md" />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    LoginForm,
  },
};
</script>
