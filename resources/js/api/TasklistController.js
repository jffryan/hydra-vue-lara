import { makeRequest, buildUrl } from "./apiHelpers";

// Get all
const getAllTasklists = () => makeRequest("get", buildUrl("tasklists"));
// Get One
const getOneTasklist = (tasklist_id) =>
  makeRequest("get", buildUrl("tasklists", tasklist_id));
// Add
const createTasklist = (tasklist) =>
  makeRequest("post", buildUrl("tasklists"), { tasklist });
// Update
const updateTasklist = (tasklist) =>
  makeRequest("patch", buildUrl("tasklists", tasklist.tasklist_id), {
    tasklist,
  });

export { getAllTasklists, getOneTasklist, createTasklist, updateTasklist };
