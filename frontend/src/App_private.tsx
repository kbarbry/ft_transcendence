import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import { Home } from './home/Home'
import { NotFound } from './ErrorPages/404'
import PrivateChannel from './chat/PrivateChannels'

import { useAuth } from './auth/AuthContext'
import { Welcome } from './Test/Test_welcome'
import { Game } from './Test/Test_game'
import useLocation from 'wouter/use-location'
import Relations from './relations/Relations'
import Channels from './chat/Channels'

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
      <Link href='/privateChannel'>
        <a>Private Messages</a>
      </Link>
      <br />
      <Link href='/channel'>
        <a>Channels</a>
      </Link>
      <br />
      <Link href='/relations'>
        <a>Friends</a>
      </Link>
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
        <Route path='/privateChannel' component={PrivateChannel} />
        <Route path='/channel' component={Channels} />
        <Route path='/relations' component={Relations} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/' component={Home} />
        <Route path='/game' component={Game} />

        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App_private
