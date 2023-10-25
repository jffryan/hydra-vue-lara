<template>
  <div>
    <component :is="getCurrentComponent" :component-data="componentData" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { usePopupStore } from "@/stores";

import DeleteTaskAcknowledgement from "@/components/popups/deleteTasks/DeleteTaskAcknowledgement.vue";
import DeleteTaskConfirmation from "@/components/popups/deleteTasks/DeleteTaskConfirmation.vue";
import DeleteTaskError from "@/components/popups/deleteTasks/DeleteTaskError.vue";

import DeleteTasklistAcknowledgement from "@/components/popups/deleteTasklists/DeleteTasklistAcknowledgement.vue";
import DeleteTasklistConfirmation from "@/components/popups/deleteTasklists/DeleteTasklistConfirmation.vue";
import DeleteTasklistError from "@/components/popups/deleteTasklists/DeleteTasklistError.vue";

import DeleteProjectAcknowledgement from "@/components/popups/deleteProjects/DeleteProjectAcknowledgement.vue";
import DeleteProjectConfirmation from "@/components/popups/deleteProjects/DeleteProjectConfirmation.vue";
import DeleteProjectError from "@/components/popups/deleteProjects/DeleteProjectError.vue";

export default {
  name: "PopupInner",
  components: {
    DeleteTaskAcknowledgement,
    DeleteTaskConfirmation,
    DeleteTaskError,
    DeleteTasklistAcknowledgement,
    DeleteTasklistConfirmation,
    DeleteTasklistError,
    DeleteProjectAcknowledgement,
    DeleteProjectConfirmation,
    DeleteProjectError,
  },
  setup() {
    const PopupStore = usePopupStore();
    const componentsMap = ref({
      DeleteTaskAcknowledgement: "DeleteTaskAcknowledgement",
      DeleteTaskConfirmation: "DeleteTaskConfirmation",
      DeleteTaskError: "DeleteTaskError",
      DeleteTasklistAcknowledgement: "DeleteTasklistAcknowledgement",
      DeleteTasklistConfirmation: "DeleteTasklistConfirmation",
      DeleteTasklistError: "DeleteTasklistError",
      DeleteProjectAcknowledgement: "DeleteProjectAcknowledgement",
      DeleteProjectConfirmation: "DeleteProjectConfirmation",
      DeleteProjectError: "DeleteProjectError",
    });
    const getCurrentComponent = computed(() => {
      return componentsMap.value[PopupStore.currentComponent];
    });
    return {
      PopupStore,
      getCurrentComponent,
    };
  },
  computed: {
    componentData() {
      return this.PopupStore.componentData;
    },
  },
};
</script>
