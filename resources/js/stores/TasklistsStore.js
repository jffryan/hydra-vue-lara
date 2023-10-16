import { defineStore } from "pinia";
import {
  getAllTasklists,
  getOneTasklist,
  updateTasklist,
} from "@/api/TasklistController";

const useTasklistsStore = defineStore("TasklistsStore", {
  state: () => ({
    allTasklists: [],
    currentTasklist: null,
  }),
  actions: {
    async fetchAllTasklists() {
      try {
        const res = await getAllTasklists();
        this.setAllTasklists(res.data);
      } catch (error) {
        console.error("Failed to fetch tasklists: ", error.message);
      }
    },
    async fetchCurrentTasklist(tasklist_id) {
      let currentTasklist = this.allTasklists.find(
        (tasklist) => tasklist.tasklist_id === tasklist_id
      );
      if (!currentTasklist) {
        const res = await getOneTasklist(tasklist_id);
        currentTasklist = res.data;
      }
      this.setCurrentTasklist(currentTasklist);
      return currentTasklist;
    },
    setAllTasklists(tasklists) {
      this.allTasklists = tasklists;
    },
    setCurrentTasklist(tasklist) {
      this.currentTasklist = tasklist;
    },
    filterPinnedTasklists(tasklists) {
      return tasklists.filter((tasklist) => tasklist.is_pinned === 1);
    },
    async updateTasklist(tasklist) {
      try {
        // Update the tasklist in the database
        const { tasklist_id } = tasklist;
        const res = await updateTasklist(tasklist);
        const updatedTasklist = res.data;
        // Update the tasklist in the store
        const index = this.allTasklists.findIndex(
          (storedTasklist) => storedTasklist.tasklist_id === tasklist_id
        );
        this.allTasklists[index] = updatedTasklist;
        // Update the current tasklist if it's the one being updated
        if (this.currentTasklist.tasklist_id === tasklist_id) {
          this.currentTasklist = updatedTasklist;
        }
        // Return the updated tasklist
        return updatedTasklist;
      } catch (error) {
        console.error("Failed to update tasklist: ", error.message);
        // Return the original tasklist
        return tasklist;
      }
    },
  },
});

export default useTasklistsStore;
