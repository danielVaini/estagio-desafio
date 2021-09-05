import React from 'react';
import Nav from '../../components/Nav';

const Sobre = () => {
  return (
    <div className="container-fluid">
      <Nav />
      <div className="card mt-5">
        <div className="card-body">
          <h3 className="card-title">Aplicação criada sobre as especificações da empresa Tokenlab</h3>
          <h6>Desenvolvido por: <span className="card-subtitle mb-2 text-muted">Daniel Vaini </span></h6>
          <p className="card-text">
            Aplicação criada como desafio para vaga de estágio da TokenLab
          </p>
          <a href="https://github.com/danielVaini" className="card-link" target="_blank">GitHub</a>
        </div>

      </div>

    </div>
  )
}

export default Sobre;