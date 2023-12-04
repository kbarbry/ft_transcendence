import React from 'react'
import { AuthProvider, useAuth } from './auth/AuthContext'
import App_private from './App_private'
import App_public from './App_public'
import { ConfigProvider, theme } from 'antd'

const App: React.FC = () => {
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
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <App />
      </ConfigProvider>
    </AuthProvider>
  )
}

export default AppWithAuthProvider
