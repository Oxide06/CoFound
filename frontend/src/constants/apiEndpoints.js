export const AUTH = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login"
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
