import React from 'react'
import { AuthProvider, useAuth } from './auth/AuthContext'
import App_private from './App_private'
import App_public from './App_public'

const App = () => {
  const authenticated = useAuth()

  return (
    <div>
      {authenticated ? (
        <App_private />
      ) : (
        <>
          <App_public />
        </>
      )}
    </div>
  )
}

const AppWithAuthProvider = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default AppWithAuthProvider
