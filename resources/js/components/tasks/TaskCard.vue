<template>
  <div>
    <h3>{{ task.name }}</h3>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
