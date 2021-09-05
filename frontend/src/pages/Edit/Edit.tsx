import React, {FormEvent, useEffect, useState} from 'react';

import {Link, useHistory, useParams} from 'react-router-dom'

import './Edit.css';
import Nav from '../../components/Nav';
import AddIcon from '../../assets/plus-square.svg'
import api from '../../server/api';



const Edit = () => {
  const history = useHistory()
  const goevents = () => history.push('/events')
  const { id }: any = useParams()


  const [desc, setDesc] = useState('')
  const [start_time, setStartTime] = useState('')
  const [end_time, setEndTime] = useState('')
  const [date, setDate] = useState('')
  
  useEffect(() => {
    api.get(`/events/${id}`).then(result => {
      setDesc(result.data[0].desc)
      setStartTime(result.data[0].start_time)
      setEndTime(result.data[0].end_time)
      setDate(result.data[0].date)
    }).catch(error => console.log(error))
  }, [])
  
  function handleEdit(e: FormEvent) {
    e.preventDefault()
    const novaData = new Date(date)
    const dataFormatada = novaData.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    
    api.put(`/events/edit/${id}`, {desc, start_time, end_time, date: dataFormatada})
    .then(res => {
      window.alert("Editado com sucesso")
      goevents()
    
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="Edit container-fluid">
      <Nav />
      <div role="form" className="form-edit">
        <div className="container-edit">

          <div className="row align-items-end mt-6">
            <div className="col">
              
              <label htmlFor="title">Titulo</label>
              <input 
                type="text" 
                className="form-control cm-input" 
                id="title" 
                name="desc" 
                value={desc} 
               onChange={e => setDesc(e.target.value)}
                />
            </div>
            <div className="row ">

              <div className="col-6">
                <label htmlFor="start-time">Inicio</label>
                <input 
                  type="time" 
                  className="form-control cm-input" 
                  id="start-time" 
                  name="start_time" 
                  value={start_time}
                  onChange={e => setStartTime(e.target.value)}
                 />
              </div>
              <div className="col-6">
                <label htmlFor="end-time">Fim</label>
                <input 
                  type="time" 
                  className="form-control cm-input" 
                  id="end-time" name="end_time" 
                  value={end_time} 
                  onChange={e => setEndTime(e.target.value)}
                  />
              </div>
            </div>
            <div className="row">

              <div className="col">
                <label htmlFor="date">Data</label>
                <input 
                  type="date" 
                  className="form-control cm-input" 
                  id="date" name="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)}
                  />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/events">
                <button className="btn btn-link" >Voltar</button>
              </Link>
              <button className="btn btn-warning align-middle mt-4" onClick={(e) => handleEdit(e)}>
                <img src={AddIcon} alt="Icone adicionar" className="me-4"/>
                Adicionar alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit;