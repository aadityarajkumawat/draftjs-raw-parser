import create from 'zustand'

type StateI = {
  content: string
  setContent: (content: string) => void
}

export const useStore = create<StateI>((set) => ({
  content: '[]',
  setContent: (content) => set(() => ({ content }))
}))
