<template>
  <main>
    <div class="flex">
      <div class="w-1/2 flex justify-center flex-col">
        <h1 class="text-6xl font-bold">Hydra</h1>
        <p class="text-3xl">Task management</p>
        <p class="text-xl">v 0.1.1</p>
        <div class="mt-8">
          <!-- Consider customizing the buttons using the color scheme from the image -->
          <!-- <router-link :to="{ name: 'about' }" class="btn btn-primary mr-4"
              >Login</router-link
            > -->
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
export default {
  name: "HomeView",
};
</script>
