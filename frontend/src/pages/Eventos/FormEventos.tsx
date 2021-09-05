import React, { useState } from 'react';
import api from '../../server/api';

import AddIcon from '../../assets/plus-square.svg'

const FormEventos = () => {
  const [desc, setDesc] = useState('')
  const [start_time, setStartTime] = useState('')
  const [end_time, setEndTime] = useState('')
  const [date, setDate] = useState('')

  function handleAddevent() {
    const novaData = new Date(date)
    const dataFormatada = novaData.toLocaleDateString('pt-BR', {timeZone: 'UTC'})


    api.post('/events/add', 
            { desc, 
              start_time, 
              end_time, 
              date: dataFormatada 
            })
            .then()
            .catch(error => window.alert('Erro'))

  }

  return (
    <div role="form" className="FormEventos mt-4">
      <div className="container-fluid">
        <div className="row align-items-end">
          <div className="col-5">
            <label htmlFor="title">Titulo</label>
            <input type="text" className="form-control cm-input" id="title" name="desc" onChange={e => setDesc(e.target.value)} />
          </div>
          <div className="col-2">
            <label htmlFor="start-time">Inicio</label>
            <input type="time" className="form-control cm-input" id="start-time" name="start_time" onChange={e => setStartTime(e.target.value)} />
          </div>
          <div className="col-2">
            <label htmlFor="end-time">Fim</label>
            <input type="time" className="form-control cm-input" id="end-time" name="end_time" onChange={e => setEndTime(e.target.value)} />
          </div>
          <div className="col-2">
            <label htmlFor="date">Data</label>
            <input type="date" className="form-control cm-input"  id="date" name="date" onChange={e => setDate(e.target.value)} />
          </div>
          <div className="col-1">
            <button className="btn btn-success align-middle" onClick={() => handleAddevent()}>
              <img src={AddIcon} alt="Icone adicionar" />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default FormEventos;