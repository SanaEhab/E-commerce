import React, { useContext, useEffect } from 'react'
import {RouterProvider} from "react-router-dom"
import {router} from './layout/routes.jsx'
import { UserContext } from './components/web/context/User.jsx';
import { CartContext } from './components/web/context/CartContext.jsx';
export default function App() {
  
// refresh problem
  let { setUserToken } = useContext(UserContext);
  let {setCount, getCartContext} = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setUserToken(localStorage.getItem("userToken"));
      setCount(getCartContext().count);
    }
  }, []);

  return (
    
     <RouterProvider router={router} />
    
  )
}
