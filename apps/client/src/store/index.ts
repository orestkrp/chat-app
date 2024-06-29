import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./auth-slice";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Store = AuthSlice;

export const useStore = create<Store>()(
  persist(
    subscribeWithSelector(
      immer((...args) => ({
        ...createAuthSlice(...args),
      }))
    ),
    {
      name: "local-storage",
    }
  )
);
