import { createContext } from 'react';

interface Auth {
  autenticado: boolean;
}

const AuthContext = createContext<Auth>({
  autenticado: false
})

export default AuthContext;