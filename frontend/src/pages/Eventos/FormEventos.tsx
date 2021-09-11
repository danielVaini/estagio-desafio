import React, { FormEvent, useEffect, useState } from 'react';
import api from '../../server/api';

import AddIcon from '../../assets/plus-square.svg'
import './FormEventos.css'

const FormEventos = () => {
  const [desc, setDesc] = useState('')
  const [start_time, setStartTime] = useState('')
  const [end_time, setEndTime] = useState('')
  const [date, setDate] = useState('')
  const [width, setWithd] = useState(window.innerWidth)

  let colTitle = 5
  let colStartTime = 2
  let colEndTime = 2
  let colDate = 2
  let colBtn = 1

  function handleAddevent(e: FormEvent) {
    e.preventDefault()
    const novaData = new Date(date)
    const dataFormatada = novaData.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    api.post('/events/add',
    {
      desc,
      start_time,
      end_time,
      date: dataFormatada
    })
    .then(() => {
      clearInputs()
      window.alert("Cadastrasdo com sucesso")
      })
      .catch(error => window.alert('Erro ao cadastrar'))
  }
    
  function clearInputs() {
      setDesc("")
      setStartTime("")
      setEndTime("")
      setDate("")
  }

  useEffect(() => {
    setWithd(window.innerWidth)
    console.log(width)
  }, [window.innerWidth])

  if(width <= 800) {
     colTitle = 3
     colStartTime = 3
     colEndTime = 3
     colDate = 3
     colBtn = 3
  }
    
    return (
    <form className="FormEventos mt-4">
      <div className="container-fluid ">
        <div className="row  row-responsive">
          <div className={`col-${colTitle}`}>
            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              className="form-control cm-input"
              id="title"
              name="desc"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              required
            />
          </div>
          <div className={`col-${colStartTime}`}>
            <label htmlFor="start-time">Inicio</label>
            <input
              type="time"
              className="form-control cm-input"
              id="start-time" 
              name="start_time"
              value={start_time}
              onChange={e => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className={`col-${colEndTime}`}>
            <label htmlFor="end-time">Fim</label>
            <input
              type="time"
              className="form-control cm-input"
              id="end-time"
              name="end_time"
              value={end_time}
              onChange={e => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className={`col-${colDate}`}>
            <label htmlFor="date">Data</label>
            <input
              type="date"
              className="form-control cm-input"
              id="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div className={`col-${colBtn}`}>
            <button className="btn btn-success align-middle buttonAdd" type="submit" onClick={(e) => handleAddevent(e)}>
              <img src={AddIcon} alt="Icone adicionar" />
            </button>
          </div>
        </div>

      </div>

    </form>
  )
}

export default FormEventos;