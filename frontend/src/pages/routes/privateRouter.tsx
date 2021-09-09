import { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../data/store/auth'

const PrivateRouter = ({ component: Component, ...rest}: any) => {
  const context = useContext(AuthContext)
  return (
    <Route 
      {...rest}
      render={(props) => {
        if(context.autenticado){
          return <Component />
        }else {
          return <Redirect to={{pathname: '/login', state:{ from: props.location } }} />
        }
      }}
    />
  )
}


export default PrivateRouter