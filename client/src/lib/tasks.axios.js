import { api } from "./api";

export const createTask = async (taskData) => {
  const response = await api.post("/tasks", taskData);
  return response.data;
};

export const getTasks = async (status) => {
  const res = await api.get("/tasks", {
    params: { status },
  });
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

export const completeTask = async (id) => {
  const res = await api.patch(`/tasks/${id}/complete`);
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data?.task;
};

export const updateTask = async ({ id, taskData }) => {
  const res = await api.put(`/tasks/${id}`, taskData);
  return res.data;
};

export const markTaskIncomplete = async (id) => {
  const res = await api.patch(`/tasks/${id}/incomplete`);
  return res.data;
};
