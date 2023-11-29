import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import Authentication from './auth/Authentication'
import { Home } from './home/Home'
import { NotFound } from './ErrorPages/404'
import { FindUser } from './auth/IsAuth'
import PrivateMessage from './chat/PrivateMessage'
import { useDispatch } from 'react-redux'; // Assurez-vous d'avoir un wrapper de Redux pour fournir le store
import { logout } from './auth/logout'; // Assurez-vous d'avoir le chemin correct


function App_private() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      console.log('button')
      window.location.href = 'http://127.0.0.1:3000/api/auth/logout';
      localStorage.removeItem('userInfo');
      sessionStorage.removeItem('userInfo')
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };
  
  return (
    <div className='App_private'>
                <h2>Private APP</h2>

      <Link href='/home'>
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
      {/* <a href='http://localhost:3000/api/auth/logout'>logout</a> */}
      <button onClick={handleLogout}>Logout</button>

      <br></br>
      <br></br>
      <br></br>
      <Switch>
        <Route path='/home' component={Home} />
        {/* <Route path='/auth' component={Authentication} /> */}
        <Route path='/chat' component={PrivateMessage} />
        <Route path='/testUser' component={FindUser} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App_private
