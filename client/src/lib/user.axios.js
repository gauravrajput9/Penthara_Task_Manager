import { api } from "./api";

export const getUser = async () => {
  const res = await api.get("/user/me");
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/user/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/user", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/user/logout");
  return res.data;
};
