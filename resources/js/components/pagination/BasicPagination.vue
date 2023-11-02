<template>
  <div class="flex justify-end items-end mb-4">
    <button @click="previousPage" :disabled="currentPage <= 1" class="mr-4">
      Previous
    </button>
    <span class="mr-4">Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage >= totalPages">
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: "BasicPagination",
  props: {
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
  },
};
</script>
