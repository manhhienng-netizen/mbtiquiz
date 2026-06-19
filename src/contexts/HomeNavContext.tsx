import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface HomeNavContextValue {
  suppressHomeButton: boolean
  setSuppressHomeButton: (suppress: boolean) => void
}

const HomeNavContext = createContext<HomeNavContextValue | null>(null)

export function HomeNavProvider({ children }: { children: ReactNode }) {
  const [suppressHomeButton, setSuppressHomeButtonState] = useState(false)

  const setSuppressHomeButton = useCallback((suppress: boolean) => {
    setSuppressHomeButtonState(suppress)
  }, [])

  const value = useMemo(
    () => ({ suppressHomeButton, setSuppressHomeButton }),
    [suppressHomeButton, setSuppressHomeButton],
  )

  return (
    <HomeNavContext.Provider value={value}>{children}</HomeNavContext.Provider>
  )
}

export function useHomeNav() {
  const ctx = useContext(HomeNavContext)
  if (!ctx) {
    throw new Error('useHomeNav must be used within HomeNavProvider')
  }
  return ctx
}

/** Hide global home button while roleplay (or similar) is active. */
export function useSuppressHomeButton(suppress: boolean) {
  const { setSuppressHomeButton } = useHomeNav()

  useEffect(() => {
    setSuppressHomeButton(suppress)
    return () => setSuppressHomeButton(false)
  }, [suppress, setSuppressHomeButton])
}
