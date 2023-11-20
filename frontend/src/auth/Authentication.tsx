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