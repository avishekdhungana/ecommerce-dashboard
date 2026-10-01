import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";

type UserName = User["name"];

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userName: UserName | null;
  login: (token: string) => void;
  setUserName: (userName: UserName | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      userName: null,
      login: (token) => set({ token, isAuthenticated: true }),
      setUserName: (userName) => set({ userName }),
      logout: () => set({ token: null, isAuthenticated: false, userName: null }),
    }),
    { name: "auth-storage" }
  )
);
