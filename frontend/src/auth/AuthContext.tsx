// AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react'
import { useApolloClient, gql } from '@apollo/client'
import { useLocation } from 'wouter'

interface AuthContextProps {
  authenticated: boolean
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps>({
  authenticated: false,
  setAuthenticated: () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context.authenticated
}

interface Props {
  children?: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const client = useApolloClient()
  const [authenticated, setAuthenticated] = useState(false)
  const [setLocation] = useLocation()

  const checkAuthentication = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          query IsAuthenticated {
            findOneUserByContext {
              username
              mail
              id
              validation2fa
            }
          }
        `
      })

      const isAuthenticated = data.findOneUserByContext
      const is2favalid = data.findOneUserByContext.validation2fa
      console.log(data.findOneUserByContext.validation2fa)
      setAuthenticated(isAuthenticated)
      if (is2favalid === false)
      setAuthenticated(false)
    } catch (error) {
      setAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [client, setLocation])

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
