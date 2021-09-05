import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CadastroIcon from '../../assets/cadastro-icon.svg'
import api from '../../server/api';
import './Cadastro.css'




const Cadastro = () => {
  const history = useHistory()
  const goLogin = () => history.push('/login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleCreateUser(e: FormEvent){
    e.preventDefault()
    api.post('/cadastro', {name, email, password}).then((result) => {
    }).catch(error => console.log("Erro ao criar usuário"))
    goLogin()
  }


  return (
    <div className="Cadastro container-fluid">
      <div className="icon">
        <img src={CadastroIcon} alt="Icone de cadastro"  />
      </div>
      <form  className="input-bg mb-3">

        <div className="input-container">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Nome" name="name" required onChange={e => setName(e.target.value)}/>
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Senha" name="password" required onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="input-group mb-3">
          
            <input type="text" className="form-control" placeholder="Email" name="email" required onChange={e => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="btns-container mt-4" >
          <Link to="/login">
           <button className="btn brn-link">Login</button>

          </Link>
          <button className="btn btn-success" onClick={(e) => handleCreateUser(e)}>Cadastrar</button>
        </div>
      </form>
    </div>
  )
}

export default Cadastro;