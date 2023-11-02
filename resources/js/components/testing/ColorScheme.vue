<template>
  <div>
    <h2>Color scheme:</h2>
    <div
      v-for="colorScheme in colorSchemes"
      :key="colorScheme.name"
      class="bg-white p-4 rounded-md mb-4"
    >
      <h3 class="capitalize text-black">{{ colorScheme.name }}</h3>
      <div class="grid grid-cols-9 gap-x-2 gap-y-4">
        <div
          v-for="number in 9"
          :key="number"
          :class="'bg-hydra-' + colorScheme.name + '-' + number + '00'"
          class="w-full h-24 rounded-md"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorScheme",
  data() {
    return {
      colorSchemes: [
        {
          name: "cinder",
        },
        {
          name: "navy",
        },
        {
          name: "green",
        },
        {
          name: "amber",
        },
        {
          name: "auburn",
        },
      ],
    };
  },
};
</script>
