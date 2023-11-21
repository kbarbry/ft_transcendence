// // Authentication.tsx
// import React, { useState } from 'react';
// import { Signup } from './Signup/SignupForm';
// import { Login } from './Login/LoginForm';

// interface AuthenticationProps {
//   onFormSwitch: (formName: string) => void;
// }

// const Authentication: React.FC<AuthenticationProps> = ({ onFormSwitch }) => {
//   const [currentForm, setCurrentForm] = useState('login');

//   const toggleForm = (formName: string) => {
//     setCurrentForm(formName);
//     onFormSwitch(formName);
//   };

//   return (
//     <div>
//       {currentForm === 'Login' ? (
//         <Login onFormSwitch={toggleForm} />
//       ) : (
//         <Signup onFormSwitch={toggleForm} />
//       )}
//     </div>
//   );
// };

// export default Authentication;

import React from 'react';
//import { GoogleLogin } from '@react-oauth/google';
import { Log42 } from './GoogleAuth/GoogleRequest'
import { Link, Route, RouteComponentProps } from 'wouter';


const Authentication = () => {

  const handleLogUserClick = () => {
    console.log('button clicked')
    Log42()
      .catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      });
  };

  return (
    <div>
      <h2>Auth page</h2>
      <br />
      <Link href="/auth/login">
        <a>Login</a>
      </Link>
      <p></p>
      <Link href="/auth/Signup">
        <a>Signup</a>
      </Link>
      <br />
        <br></br>
      <a href="http://localhost:3000/api/auth/42/login" >42Login</a>
      <br></br>
      <a href="http://localhost:3000/api/auth/google/login" >GoogleLogin</a>
      <br></br>
      <a href="http://localhost:3000/api/auth/github/login" >GithubLogin</a>


    </div>
  );
};

export default Authentication;
