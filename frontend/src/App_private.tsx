import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import { Home } from './home/Home'
import { NotFound } from './ErrorPages/404'
import { FindUser } from './auth/IsAuth'
import PrivateMessage from './chat/PrivateMessage'

import { useAuth } from './auth/AuthContext'
import { Welcome } from './Test/Test_welcome'
import { Game } from './Test/Test_game'
import { Settings } from './auth/2fa/settings'
import useLocation from 'wouter/use-location'

const App_private: React.FC = () => {
  const authenticated = useAuth()
  const [, setLocation] = useLocation()

  const handleLogout = async () => {
    try {
      window.location.href = 'http://127.0.0.1:3000/api/auth/logout'
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('userInfo')
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error)
    }
  }
  if (!authenticated) {
    setLocation('/forbidden', { replace: true })
  }

  return (
    <div className='App_private'>
      <h2>Private APP</h2>

      <Link href='/'>
        <a>Home</a>
      </Link>
      <br />
      <Link href='/chat'>
        <a>Chat Discussion</a>
      </Link>
      <br />
      <Link href='/testUser'>
        <a>Test getUser</a>
      </Link>
      <br />
      <br />
      <Link href='/settings'>
        <a>Settings</a>
      </Link>
      <br />
      <br />
      <Link href='/game'>
        <a>Game</a>
      </Link>
      <br />
      <br />
      <Link href='/'>
        <a>WelcomePage</a>
      </Link>
      <br />
      <button onClick={handleLogout}>Logout</button>

      <br></br>
      <br></br>
      <br></br>
      <Switch>
        <Route path='/settings' component={Settings} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/' component={Home} />
        <Route path='/chat' component={PrivateMessage} />
        <Route path='/testUser' component={FindUser} />
        <Route path='/game' component={Game} />

        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App_private
