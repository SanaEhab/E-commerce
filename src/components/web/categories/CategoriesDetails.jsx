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
    <div className='products overflow-x-hidden mb-5'>
        {data.length? data.map((product)=>
            <div className='product' key={product._id}>
                <div className='row'>
                    <div className='col-lg-6 d-flex justify-content-center pt-3'>
                        <img src={product.mainImage.secure_url}/>
                    </div>
                    <div className='col-lg-6 pt-5'>
                        <h4>{product.name}</h4>
                        <Link className='link' to={`/products/${product._id}`}>Details</Link>
                    </div>
                </div>
            </div>
        ): 'no products'}
    </div>
  )
}
