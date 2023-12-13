import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader';
import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../context/CartContext';

export default function Product() {

    const {productId} = useParams();
    const {addToCartContext} = useContext(CartContext);

    const getProductDetails = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }

    const {data,isLoading} = useQuery('product-detail',getProductDetails);
    
    const addToCart = async(productId)=>{
      const result = await addToCartContext(productId)

    }
    

    if(isLoading){
        return <Loader/>
    }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-5 my-3">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: data.name,
                isFluidWidth: true,
                src: data.mainImage.secure_url,
              },
              largeImage: {
                src: data.mainImage.secure_url,
                width: 1000,
                height: 1600,
              },
              enlargedImagePosition: 'over',
              isHintEnabled:true,
            }}
          />
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

