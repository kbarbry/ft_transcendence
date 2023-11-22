import React, { useState } from 'react';
import {createUser} from './createUser'
import { useLocation, Link, Redirect } from 'wouter';


export const Signup = (props : any) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [username, setUsername] = useState('')
    const [userData, setUserData] = useState(null);
    const [redirect, setRedirect] = useState(false);



    const handleCreateUserClick = () => {
        console.log('button clicked')
        createUser(username, email, pass)
          .then((userData) => {
            setUserData(userData);
            setRedirect(true);
          })
          .catch((error) => {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
          });
      };

      
      const handleSubmit = (e : any) => {
          e.preventDefault()
          console.log(email)
        }

        if (redirect)
            return (<Redirect to="/auth/Login" />)
        

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="username">username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="username" id="username" name="username" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button onClick={handleCreateUserClick}>Créer un utilisateur</button>
            </form>
                <p>Already have an account ?</p>
            <Link href="/auth/Login">
                <a>Login Here </a>
                </Link>
        </div>
    )
}