// window.onerror = function (message, source, lineno, colno, error) {
//   return true
// }
import React from 'react'
import { AuthProvider, useAuth } from './auth/AuthContext'
import App_private from './App_private'
import App_public from './App_public'
import { ConfigProvider, theme } from 'antd'

window.addEventListener('unhandledrejection', (event) => {
  {
    //window.location.href = 'http://127.0.0.1:3000/api/auth/logout'
    //window.alert('Ceci est un avertissement !')
    console.log('fatal error')
  }
  event.preventDefault()
})

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
