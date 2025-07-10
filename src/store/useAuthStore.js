import { create } from "zustand";

export const useAuthStore = create((set) => {
  const userData = JSON.parse(localStorage.getItem("safari_user"));
  return {
    user: userData || null,
    login: (userData) => {
      localStorage.setItem("safari_user", JSON.stringify(userData));
      set({ user: userData });
    },
    logout: () => {
      localStorage.removeItem("safari_user");
      set({ user: null });
    },
  };
});
