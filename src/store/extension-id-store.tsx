import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  extensionId: string
}

type Actions = {
  setExtensionId: (extension: State['extensionId']) => void
}

const initialState: State = {
  extensionId: ''
}

const useExtensionIdStore = create<State & Actions>()(
  persist( 
    (set) => ({
      ...initialState,
      setExtensionId: (extensionId) => {
        set({ extensionId: extensionId })
      }
    }),
    {
      name: 'extension-id-store-boulangerie-nabiso',
    }
  )
)

export default useExtensionIdStore