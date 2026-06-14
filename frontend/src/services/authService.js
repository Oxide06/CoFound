import api from "@/services/axiosInstance";
import { AUTH } from "@/constants/apiEndpoints";

export const authService = {
  register: (data) => api.post(AUTH.REGISTER, data),
  login: (data) => api.post(AUTH.LOGIN, data),
  verifyEmail: (token) => api.post(AUTH.VERIFY_EMAIL, { token }),
  resendVerification: (email) => api.post(AUTH.RESEND_VERIFICATION, { email }),
  forgotPassword: (email) => api.post(AUTH.FORGOT_PASSWORD, { email }),
  resetPassword: (token, password) => api.post(AUTH.RESET_PASSWORD, { token, password }),
  logout: () => {
    localStorage.removeItem("cofound_token");
    localStorage.removeItem("cofound_user");
  }
};
