import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  getCurrentP2PUser,
  signOutP2P,
  type P2PUser,
} from '../lib/p2p/auth-service'

interface P2PAuthCtx {
  user: P2PUser | null
  loading: boolean
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const P2PAuthContext = createContext<P2PAuthCtx>({
  user: null,
  loading: true,
  signOut: async () => {},
  refresh: async () => {},
})

export function P2PAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<P2PUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    const u = await getCurrentP2PUser()
    setUser(u)
    setLoading(false)
  }

  useEffect(() => {
    void refresh()
  }, [])

  const signOut = async () => {
    await signOutP2P()
    setUser(null)
  }

  return (
    <P2PAuthContext.Provider value={{ user, loading, signOut, refresh }}>
      {children}
    </P2PAuthContext.Provider>
  )
}

export const useP2PAuth = () => useContext(P2PAuthContext)
