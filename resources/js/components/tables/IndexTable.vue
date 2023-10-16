<template>
  <div>
    <div
      class="grid grid-cols-12 gap-x-4 rounded-t-md bg-hydra-cinder-900 border-b border-zinc-600"
    >
      <div class="col-span-3 p-2">
        <p class="text-2xl mb-0">{{ title }}</p>
      </div>
    </div>
    <IndexTableRows :tableData="tableData" :dataType="dataType" />
  </div>
</template>

<script>
import IndexTableRows from "@/components/tables/IndexTableRows.vue";

export default {
  name: "IndexTable",
  props: {
    title: {
      type: String,
      default: "TITLE MISSING",
    },
    tableData: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    dataType: {
      type: String,
      required: true,
    },
  },
  components: {
    IndexTableRows,
  },
};
</script>
