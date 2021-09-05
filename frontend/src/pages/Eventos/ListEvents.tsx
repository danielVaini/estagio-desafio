import React, { useEffect, useState } from 'react';
import api from '../../server/api';

import LixoIcon from '../../assets/trash-fill.svg'
import EditIcon from '../../assets/pencil-fill.svg'
import FormEventos from './FormEventos';
import Edit from '../../pages/Edit/Edit';
import { Link } from 'react-router-dom';


const ListEvents = () => {
 const [list, setList] = useState([]);

 useEffect(() => {
  api.get('/events').then((res) => {
    setList(res.data)
  })
 }, [list])


 function handleRemove(id: any) {
  api.get(`/events/remove/${id}`).then().catch(error => window.alert("Error"))
 }
 

  return (
    <div className="ListEvents">
      <FormEventos />
      <table className="table mt-5">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Inicio</th>
          <th>Fim</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.map((event: any) => {
          return (
            <tr key={event._id}>
              <td>{event.desc}</td>
              <td>{event.start_time}</td>
              <td>{event.end_time}</td>
              <td>{event.date}</td>
              <td>
                <Link to={`/events/edit/${event._id}`}>
                <button className="btn btn-warning me-4">
                  <img src={EditIcon} alt="Icone de edição" />
                </button>
                </Link>
                <button className="btn btn-danger" onClick={() => handleRemove(event._id)}>
                  <img src={LixoIcon} alt="Icone de lixo" />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
   
    </div>
  )
}

export default ListEvents;