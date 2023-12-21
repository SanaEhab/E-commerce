import axios from 'axios'
import React from 'react'
import Loader from '../../loader/Loader';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import './Categories.css'

export default function Categories() {

  const getCategories = async()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=8`)
    return data;
  }


  const {data,isLoading} = useQuery('web-categories',getCategories)
//const query = useQuery(name,getData)
  if(isLoading){
    return <Loader/>
  }

  return (
    <div className='container catigories vh-100'>
      <Swiper
       modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={5.5}
      navigation
      loop={true}
      autoplay={{
        delay:2500
      }}
      pagination={{
         clickable: true,
         el:'.swiper-custom-pagination'
         }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.categories.length?data.categories.map( (category)=>
      <SwiperSlide key={category._id}>
        <Link to={`/products/category/${category._id}`}>
        <img src={category.image.secure_url} alt={category.name}/>
        </Link>
        </SwiperSlide>
      ):'no category found'}
    </Swiper>
    <div className='swiper-custom-pagination'></div>
    </div>
  )
}
