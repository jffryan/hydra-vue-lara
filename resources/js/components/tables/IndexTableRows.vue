<template>
  <div class="rounded-b-md">
    <div v-if="tableData.length > 0">
      <router-link
        v-for="row in tableData"
        :key="row[rowId]"
        :to="{
          name: `${dataType}s.show`,
          params: { id: row[rowId] },
        }"
        :class="getRowClass(row)"
        class="block p-2 border-zinc-600 border-b text-xl hover:text-light-purple"
      >
        {{ row.name }}</router-link
      >
    </div>
    <div v-else class="p-2 bg-hydra-cinder-600 border-zinc-600 border-b">
      <p class="m-0">
        No {{ dataType }}s found. Create a new {{ dataType }} to begin.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexTableRows",
  props: {
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
  computed: {
    rowId() {
      return `${this.dataType}_id`;
    },
  },
  methods: {
    getRowClass(row) {
      if (row.status_id === 2) {
        return "bg-hydra-green-700 hover:bg-hydra-green-500";
      }
      return "bg-hydra-cinder-600 hover:bg-hydra-cinder-400";
    },
  },
};
</script>
