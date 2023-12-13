import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export function CartContextProvider({children}){

    const [count, setCount] = useState(0);

    const addToCartContext = async(productId)=>{
        try{
            const token =localStorage.getItem("userToken");
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            );
            if(data.message=="success"){
                toast.success('product added successfully', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    const getCartContext = async()=>{
        const token = localStorage.getItem("userToken");
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers:{Authorization:`Tariq__${token}`}});
        setCount(data.count);
        return data;
    }

    const removeItemContext =async(productId)=>{
        try{
            const token =localStorage.getItem("userToken");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId},
            {headers:{Authorization:`Tariq__${token}`}});
            if(data.message=="success"){
                toast.success('product removed successfully', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
            return data;
            
        }
        catch(error){
            console.log(error);
        }
        
    }

    return <CartContext.Provider value={{addToCartContext, getCartContext,removeItemContext,count}}>
        {children}
    </CartContext.Provider>

}
