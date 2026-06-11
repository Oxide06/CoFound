import api from "@/services/axiosInstance";
import { USERS } from "@/constants/apiEndpoints";

export const userService = {
  getMe: () => api.get(USERS.ME),
  updateMe: (data) => api.patch(USERS.ME, data),
  getUserByUsername: (username) => api.get(USERS.BY_ID(username)),
  getAllUsers: (filters = {}) => api.get(USERS.ROOT, { params: filters })
};
