import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const CartContext = createContext(null);

export function CartContextProvider({children}){

    let [count, setCount] = useState(0);

    const addToCartContext = async(productId)=>{
        try{
            const token =localStorage.getItem("userToken");
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}});
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
            setCount(++count);
            return data;
        }
        catch(error){
            if(error){
                toast.error('The product has already been added', {
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
            setCount(--count);
            return data;
        }
        catch(error){
            return error;
        }
        
    }

    const clearCartContext = async()=>{
        try{
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,null,
            {headers:{Authorization:`Tariq__${token}`}});
            if(data.message=="success"){
                toast.success('Cart has been cleared', {
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
            setCount(data.valueOf.length);
        }
        catch(error){
            return error;
        }
    }

    const increaseQuantity = async(productId)=>{
        try{
            const token =localStorage.getItem("userToken");
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}});
        }
        catch(error){
            return error;
        }
    }

    const decreaseQuantity = async(productId)=>{
        const token = localStorage.getItem("userToken");
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}});
    }

    return(
        <CartContext.Provider value={{addToCartContext, getCartContext,removeItemContext,count, setCount,clearCartContext,increaseQuantity,decreaseQuantity}}>
        {children}
        </CartContext.Provider>
    )

}
