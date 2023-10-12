import { makeRequest, buildUrl } from "./apiHelpers";

// Get all
const getAllTasks = () => makeRequest("get", buildUrl("tasks"));
// Get One
const getOneTask = (task_id) => makeRequest("get", buildUrl("tasks", task_id));
// Add
const createTask = (task) => makeRequest("post", buildUrl("tasks"), { task });
// Update
const updateTask = (task) =>
  makeRequest("patch", buildUrl("tasks", task.task_id), { task });
// Delete
const deleteTask = (task_id) =>
  makeRequest("delete", buildUrl("tasks", task_id), { task_id });
// Delete multiple
// const deleteSomeTasks = async (task_ids) => {
//   for (let task_id of task_ids) {
//     await deleteTask(task_id);
//   }
// };
// Delete Subtask
const deleteSubtask = (subtask_id) =>
  makeRequest("delete", buildUrl("subtask", subtask_id), { subtask_id });

export {
  createTask,
  getAllTasks,
  getOneTask,
  updateTask,
  deleteTask,
  deleteSubtask,
  // deleteSomeTasks,
};
