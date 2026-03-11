import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      usersData: {},

      login: (username) => {
        const name = username.trim().toLowerCase();

        set((state) => {
          const newUsers = { ...state.usersData };

          if (!newUsers[name]) {
            newUsers[name] = {
              likes: 0,
              comments: [],
              description:
                "Mahasiswa kreatif dan inovatif di bidang teknologi.",
              avatar: "",
            };
          }

          return { user: name, usersData: newUsers };
        });
      },

      logout: () => set({ user: null }),

      updateUser: (newData) => {
        const { user, usersData } = get();

        set({
          usersData: {
            ...usersData,
            [user]: {
              ...usersData[user],
              ...newData,
            },
          },
        });
      },
    }),
    {
      name: "web-apresiasi-storage",
    }
  )
);