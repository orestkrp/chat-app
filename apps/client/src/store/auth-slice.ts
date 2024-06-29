import { guestAxios } from "@/axios";
import { NavigateFunction } from "react-router-dom";
import { StateCreator } from "zustand";

interface AuthData {
  accessToken: string;
  refreshToken: string;
  userId: string;
  navigate: null | NavigateFunction;
}

interface AuthActions {
  setAuth: (accessToken: string, refreshToken: string, userId: string) => void;
  refreshTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  clearToken: () => void;
  isLoggedIn: () => boolean;
  refreshAuthToken(): Promise<{ accessToken: string; refreshToken: string }>;
  setNavigate: (navigate: NavigateFunction) => void;
}

const initialState: AuthData = {
  accessToken: "",
  refreshToken: "",
  userId: "",
  navigate: null,
};

export type AuthSlice = AuthData & AuthActions;

export const createAuthSlice: StateCreator<
  AuthSlice,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set, get) => ({
  ...initialState,
  setAuth: (accessToken: string, refreshToken: string, userId: string) => {
    set((state) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.userId = userId;
    });
  },
  refreshTokens: (accessToken: string, refreshToken: string) => {
    set((state) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    });
  },
  clearToken: () => set({ accessToken: "", refreshToken: "" }),
  clearAuth: () => {
    set(() => initialState);
  },
  async refreshAuthToken() {
    const { refreshToken, refreshTokens, clearAuth } = get();
    if (!refreshToken) {
      clearAuth();
      return Promise.reject(new Error("No refresh token available"));
    }

    try {
      const response = await guestAxios.post("/auth/refresh", {
        refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      refreshTokens(accessToken, newRefreshToken);
      return accessToken;
    } catch (error) {
      clearAuth();
      return Promise.reject(error);
    }
  },
  navigate: null,
  setNavigate: (navigate) => set({ navigate }),
  isLoggedIn: () => !!get().accessToken,
});
