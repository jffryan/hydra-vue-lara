import { defineStore } from "pinia";
import {
  getAllProjects,
  getOneProject,
  deleteProject,
} from "@/api/ProjectController";

const useProjectsStore = defineStore("ProjectsStore", {
  state: () => ({
    allProjects: [],
    allCurrentProjects: null,
    currentProject: null,
    viewFormat: "list",
  }),
  actions: {
    async fetchAllProjects() {
      try {
        const res = await getAllProjects();
        this.setAllProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects: ", error.message);
      }
    },
    async fetchCurrentProject(project_id) {
      let currentProject = this.allProjects.find(
        (project) => project.project_id === project_id
      );
      if (!currentProject) {
        const res = await getOneProject(project_id);
        currentProject = res.data;
      }
      this.setCurrentProject(currentProject);
    },
    setAllProjects(projects) {
      this.allProjects = projects;
    },
    setAllCurrentProjects(projects) {
      this.allCurrentProjects = projects;
    },
    setCurrentProject(project) {
      this.currentProject = project;
    },
    filterPinnedProjects(projects) {
      return projects.filter((project) => project.is_pinned === 1);
    },
    updateProject(project) {
      const index = this.allProjects.findIndex(
        (p) => p.project_id === project.project_id
      );
      this.allProjects[index] = project;
    },
    async deleteCurrentProject(project_id) {
      try {
        await deleteProject(project_id);
        return {
          success: true,
        };
      } catch (err) {
        return {
          success: false,
          message: `Error deleting project: ${err.message}`,
        };
      }
    },
    clearProjectFromState(project_id) {
      this.allProjects = this.allProjects.filter(
        (project) => project.project_id !== project_id
      );
      if (this.currentProject?.project_id === project_id) {
        this.currentProject = null;
      }
    },
  },
});

export default useProjectsStore;
