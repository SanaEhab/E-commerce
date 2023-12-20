import { createContext, useContext, useState } from "react";
import { UserContext } from "./User";
import axios from "axios";

export let OrderContext = createContext();


export default function OrderContextProvider({children}){

  let {userToken} = useContext(UserContext);
  let [orders, setOrders] = useState(null);
  const getOrder = async ()=>{
    if(userToken){
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
      {headers:{Authorization:`Tariq__${userToken}`}});
      setOrders(data.orders);
    }
  }
getOrder();
return <OrderContext.Provider value={{setOrders, orders}}>
        {children}
  </OrderContext.Provider>
}