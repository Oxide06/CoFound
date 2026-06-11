import api from "@/services/axiosInstance";
import { AUTH } from "@/constants/apiEndpoints";

export const authService = {
  register: (data) => api.post(AUTH.REGISTER, data),
  login: (data) => api.post(AUTH.LOGIN, data),
  logout: () => {
    localStorage.removeItem("cofound_token");
    localStorage.removeItem("cofound_user");
  }
};
