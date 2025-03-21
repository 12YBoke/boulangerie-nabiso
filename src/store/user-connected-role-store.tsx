import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  userConnectedRole: "ADMIN" | "USER" | undefined;
};

type Actions = {
  setUserConnectedRole: (extension: State["userConnectedRole"]) => void;
};

const initialState: State = {
  userConnectedRole: undefined,
};

const useUserConnectedRoleStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setUserConnectedRole: (userConnectedRole) => {
        set({ userConnectedRole: userConnectedRole });
      },
    }),
    {
      name: "user-connected-role-store-boulangerie-nabiso",
    }
  )
);

export default useUserConnectedRoleStore;
