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
import { GoogleLogin } from '@react-oauth/google';
import { LogGoogle } from './GoogleAuth/GoogleRequest'

const Authentication = () => {
  const responseMessage = (response) => {
    console.log(response);
    // Effectuez des actions supplémentaires si nécessaire
  };

  const errorMessage = (error) => {
    console.log(error);
    // Gérez les erreurs si nécessaire
  };

  const handleLogUserClick = () => {
    console.log('button clicked')
    LogGoogle()
      .catch((error) => {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
      });
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <p>GOOGLE !!!</p>
      <button onClick={handleLogUserClick}>Créer un utilisateur</button>

    </div>
  );
};

export default Authentication;
