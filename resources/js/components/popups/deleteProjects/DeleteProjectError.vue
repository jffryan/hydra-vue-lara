<template>
  <div>
    <div class="mb-8">
      <h5 class="font-bold text-lg mb-4">
        There was an error deleting this project:
      </h5>
      <p>{{ errorMessage }}</p>
    </div>
    <div>
      <button @click="closePopup" class="btn btn-secondary">Return</button>
    </div>
  </div>
</template>

<script>
import { usePopupStore } from "@/stores";

export default {
  name: "DeleteTasklistError",
  props: {
    componentData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const PopupStore = usePopupStore();
    return {
      PopupStore,
    };
  },
  computed: {
    errorMessage() {
      return this.componentData.message;
    },
  },
  methods: {
    closePopup() {
      this.PopupStore.closePopup();
    },
  },
};
</script>
