import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist(
    (set) => ({
      user: { name: "incognito" },
      setUser: (newOne) => set(() => ({ user: newOne })),
      language: "kaz",
      changeLanguage: (newOne) => set(() => ({ language: newOne })),
    }),
    { name: "user storage", skipHydration: true }
  )
);

export default useUser;
