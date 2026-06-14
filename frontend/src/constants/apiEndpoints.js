export const AUTH = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  VERIFY_EMAIL: "/auth/verify-email",
  RESEND_VERIFICATION: "/auth/resend-verification",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password"
};

export const USERS = {
  ROOT: "/users",
  ME: "/users/me",
  BY_ID: (id) => `/users/${id}`
};

export const IDEAS = {
  ROOT: "/ideas",
  BY_ID: (id) => `/ideas/${id}`
};

export const CONNECTIONS = {
  ROOT: "/connections",
  BY_ID: (id) => `/connections/${id}`
};
