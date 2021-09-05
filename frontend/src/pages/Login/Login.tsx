import React, { FormEvent, useState } from 'react';
import LoginIcon from '../../assets/login-icon.svg';
import {Link, useHistory} from 'react-router-dom'

import './Login.css'
import api from '../../server/api';

const Login = () => {
  const history = useHistory()
  const goEvents = () => history.push('/events')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e: FormEvent){
    e.preventDefault()
    api.post('/login', {email, password})
    .then(result => {
    
      goEvents()
    })
    .catch(error => console.log(error))
  }

  return (
    <div className='Login container-fluid'>
        <img src={LoginIcon} alt="Icone de login" />
      <form className="inputs-container">
      
        <input type="email" className="form-control mb-4" required placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
        <input type="password" className="form-control mb-4" required placeholder="Senha" onChange={e => setPassword(e.target.value)}/>
        
        <div className="btns-container mt-4" >
        <Link to="/cadastro">
          <button className="btn brn-link text-white">Cadastrar</button>
        </Link>
          <button className="btn btn-success" onClick={(e) => handleLogin(e)}>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;