import React, { useContext, useEffect } from 'react'
import {RouterProvider} from "react-router-dom"
import { CartContextProvider } from './components/web/context/CartContext.jsx';
import {router} from './layout/routes.jsx'
import { UserContext } from './components/web/context/User.jsx';
export default function App() {
// refresh problem
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    
  )
}
