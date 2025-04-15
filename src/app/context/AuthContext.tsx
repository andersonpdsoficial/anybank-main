import { createContext, ReactNode, useEffect, useState } from "react"
import { supabase } from "../../infra/supabase/config"
import { Session } from "@supabase/supabase-js"

interface AuthContextType {
    session: Session | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession()
          .then(({ data: { session } }) => {
              setSession(session)
              console.log('getSession', session)
          })
          .finally(() => setLoading(false))

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log('onAuthStateChange', session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const logout = async () => {
        await supabase.auth.signOut()
        setSession(null)
    }

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ session, logout, login }}>
            {loading ? 'Carregando...' : children}
        </AuthContext.Provider>
    )
}

