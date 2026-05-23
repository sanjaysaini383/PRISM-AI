import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  theme: 'dark' | 'light'
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'dark' | 'light') => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTheme: (theme) => set({ theme }),
}))

interface AnalysisState {
  isAnalyzing: boolean
  progress: number
  currentAgent: string
  completedAgents: string[]
  setIsAnalyzing: (analyzing: boolean) => void
  setProgress: (progress: number) => void
  setCurrentAgent: (agent: string) => void
  addCompletedAgent: (agent: string) => void
  reset: () => void
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  isAnalyzing: false,
  progress: 0,
  currentAgent: '',
  completedAgents: [],
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  setProgress: (progress) => set({ progress }),
  setCurrentAgent: (agent) => set({ currentAgent: agent }),
  addCompletedAgent: (agent) => set((state) => ({
    completedAgents: [...state.completedAgents, agent],
  })),
  reset: () => set({
    isAnalyzing: false,
    progress: 0,
    currentAgent: '',
    completedAgents: [],
  }),
}))
