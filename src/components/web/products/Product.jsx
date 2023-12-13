import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader';
import { CartContext } from '../context/CartContext';
import './../../../index.css'

export default function Product() {

    const {productId} = useParams();
    const {addToCartContext} = useContext(CartContext);

    const getProductDetails = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }

    const {data,isLoading} = useQuery('product-detail',getProductDetails);
    console.log(data);
    const addToCart = async(productId)=>{
      const result = await addToCartContext(productId)

    }
    

    if(isLoading){
        return <Loader/>
    }

  return (
    <div className="container">
      <div className="row d-flex bg-danger">
        <div className="col-lg-5 my-3">
          <img src={data.mainImage.secure_url} className='width'/>
        </div>
        <div className="col-lg-7 mt-5">
          <h6>{data.name}</h6>
          <p>{data.price}</p>
          <button className='btn btn-outline-primary mt-2' onClick={()=>addToCart(data._id)}>
            <Link className='text-decoration-none'>Add to cart</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

