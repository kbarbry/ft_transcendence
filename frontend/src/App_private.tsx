import React from 'react'
import './App.css'
import { Link, Route, Switch } from 'wouter'
import Authentication from './auth/Authentication'
import { Home } from './home/Home'
import { NotFound } from './ErrorPages/404'
import { FindUser } from './auth/IsAuth'
import PrivateMessage from './chat/PrivateMessage'

function App_private() {
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
      <br></br>
      <br></br>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/auth' component={Authentication} />
        <Route path='/chat' component={PrivateMessage} />
        <Route path='/testUser' component={FindUser} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App_private
