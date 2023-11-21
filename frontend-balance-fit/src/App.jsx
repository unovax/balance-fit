import React, { useState } from 'react';
import LoginButton from './components/LoginComponents/LoginButton';
import FacebookButton from './components/LoginComponents/FacebookButton';
import GoogleButton from './components/LoginComponents/GoogleButton';
import Logo from './components/LoginComponents/Logo';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    console.log(email)
    console.log(password)
  };

  return (
    <div className='login__container'>
        <div className='w-full flex flex-col items-center'>
          <Logo/>
          <h1 className="text-3xl text-white">BalanceFit</h1>
        </div>
        <input placeholder='Correo electronico' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder='Contraseña' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <LoginButton onClick={login} >Iniciar sesion</LoginButton>
        <FacebookButton/>
        <GoogleButton/>
        <span className='text-white'>No tienes cuenta? <a className="text-blue-400" href="/register">Registrate</a></span>
    </div>
  );
};

export default Login;
