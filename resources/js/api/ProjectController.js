import { makeRequest, buildUrl } from "./apiHelpers";

// Fetch All Projects
const getAllProjects = () => makeRequest("get", buildUrl("projects"));

const getOneProject = (project_id) =>
  makeRequest("get", buildUrl("projects", project_id));

// Add
const createProject = (project) =>
  makeRequest("post", buildUrl("projects"), { project });

// Update
const updateProject = (project) =>
  makeRequest("patch", buildUrl("projects", project.project_id), { project });

export { getAllProjects, getOneProject, createProject, updateProject };
