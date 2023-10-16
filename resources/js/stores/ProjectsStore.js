import { defineStore } from "pinia";
import { getAllProjects, getOneProject } from "@/api/ProjectController";

const useProjectsStore = defineStore("ProjectsStore", {
  state: () => ({
    allProjects: [],
    currentProject: null,
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
  },
});

export default useProjectsStore;
