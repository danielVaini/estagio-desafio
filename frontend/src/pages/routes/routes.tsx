import React, { useContext } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Cadastro from '../Cadastro/Cadastro';
import Edit from '../Edit/Edit';
import Eventos from '../Eventos/Eventos';
import Login from '../Login/Login';
import Sobre from '../Sobre/Sobre';
import PrivateRouter from './privateRouter';

import AuthContext from '../../data/store/auth';


const Routes = () => {

  const context = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Login} />
      
      <Route path="/login" component={Login} />
      <Route path="/cadastro"  component={Cadastro} />
      {/* <Route path="/events" exact component={Eventos} /> 
      <Route path="/events/edit/:id"  component={Edit} /> */}
      <Route path="/sobre"  component={Sobre} />

      <PrivateRouter path="/events" component={Eventos} />
      <PrivateRouter path="/events/edit/:id"  component={Edit} />
      </Switch>
    </BrowserRouter>
    )
}


export default Routes