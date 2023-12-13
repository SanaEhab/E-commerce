import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader';
import './Categories.css'

export default function CategoriesDetails() {

    const {categoryId} = useParams();

    const getCategoriesDetails = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }

    const {data,isLoading} = useQuery('category-detail',getCategoriesDetails);

    if(isLoading){
        return <Loader/>
    }

  return (
    <div className='products'>
        {data.length? data.map((product)=>
            <div className='product' key={product._id}>
                <img src={product.mainImage.secure_url}/>
                <h4>{product.name}</h4>
                <Link className='link' to={`/products/${product._id}`}>Tap here to see more details about this product</Link>
            </div>
        ): 'no products'}
    </div>
  )
}
