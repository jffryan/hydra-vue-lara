<template>
  <div
    @click.self="closePopup"
    class="h-screen w-screen absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[rgba(0,0,0,.4)] z-30"
  >
    <div
      class="p-16 bg-hydra-cinder-600 border border-hydra-cinder-400 rounded-lg -translate-y-40"
    >
      <PopupInner />
    </div>
  </div>
</template>

<script>
import { usePopupStore } from "@/stores";

import PopupInner from "@/components/popups/PopupInner.vue";

export default {
  name: "PopupOverlay",
  components: {
    PopupInner,
  },
  setup() {
    const PopupStore = usePopupStore();
    return {
      PopupStore,
    };
  },
  methods: {
    closePopup() {
      this.PopupStore.closePopup();
    },
  },
};
</script>
