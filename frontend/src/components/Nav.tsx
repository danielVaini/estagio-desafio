import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../data/store/auth';
import api from '../server/api';

const Nav = () => {
  const context = useContext(AuthContext)

  function handleLogout() {
      context.autenticado = false
    
      console.log(context.autenticado)
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/events" className="navbar-brand" href="#">EventsApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-around" >
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/sobre">Sobre</Link>
            </li>
            <li className="nav-item ms-5">
              <form >
              <button className="btn btn-warning" type="submit"  onClick={() => handleLogout()}>Logout</button>
              </form>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Nav;