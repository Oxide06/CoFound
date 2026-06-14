import { createContext, useCallback, useMemo, useState } from "react";
import { authService } from "@/services/authService";
import { normalizeApiData } from "@/utils/helpers";

export const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("cofound_user")) || null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(localStorage.getItem("cofound_token"));

  const persistSession = useCallback((payload) => {
    const nextUser = payload.user;
    const nextToken = payload.token;

    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("cofound_user", JSON.stringify(nextUser));
    localStorage.setItem("cofound_token", nextToken);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const response = await authService.login(credentials);
      const payload = normalizeApiData(response);
      persistSession(payload);
      return payload;
    },
    [persistSession]
  );

  const register = useCallback(
    async (formData) => {
      const response = await authService.register(formData);
      return normalizeApiData(response);
    },
    []
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback((nextUser) => {
    setUser(nextUser);
    localStorage.setItem("cofound_user", JSON.stringify(nextUser));
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
      updateUser
    }),
    [user, token, login, register, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
