import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loader from '../../loader/Loader';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/User';
import './../../../index.css'
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import { toast } from 'react-toastify';


export default function Product() {

    const {productId} = useParams();
    const {addToCartContext} = useContext(CartContext);
    const {userToken} = useContext(UserContext);
    const [star, setStar] = useState([]);

    const getProductDetails = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data;
    }

    const {data,isLoading} = useQuery('product-detail',getProductDetails);
    const addToCart = async(productId)=>{
      const result = await addToCartContext(productId)
      

    }
   
    const rating = async()=>{
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
      let avgR = data.avgRating
      let stars = [];
      for(let i = 1; i <= avgR; i++){
        stars.push(i);
      }
      setStar(stars);
      return stars;
    }

    const initialValues ={
      comment:"",
      rating:"",
    }

    const onSubmit = async(values)=>{
      try{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,values,
        {headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data)
        if(data.message=="success"){
        formik.resetForm();
        toast.success('Thanks for your shopping', {
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
      catch(error){
        if(error.message=='Request failed with status code 400'){
          toast.error('Cant add review', {
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

    const formik = useFormik({
      initialValues,
      onSubmit,
    })

    const inputs =[
      {
        id: "comment",
        type: "text",
        name: "comment",
        title: "write your comment",
        value: formik.values.comment,
      },
      {
        id: "rating",
        type: "text",
        name: "rating",
        title: "rate the product",
        value: formik.values.rating,
      },
    ];

    useEffect(() => {
      getProductDetails();
      rating();
  }, []);

    if(isLoading){
        return <Loader/>
    }

    const renderInput = inputs.map((ele,index)=>(
      <Input
      type={ele.type}
      id={ele.id}
      name={ele.name}
      title={ele.title}
      value={ele.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched} 
      />
    ));
  return (
    <div className="container">
      <div className="row d-flex flex-wrap">
        <div className="col-lg-5 my-3">
          <img
            src={data.product.mainImage.secure_url}
            className="width"
            alt={data.product.name}
          />
        </div>
        <div className="col-lg-7 mt-5">
          <h6>Product name:</h6>
          <p>{data.product.name}</p>
          <h6>Price:</h6>
          <p>{data.product.price}</p>
          <h6>Average rate:</h6>
          {star&& star.map((ele,index)=>
          <svg key={index}
            style={{ color: "blue" }}
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
              fill="blue"
            />{" "}
          </svg>
          )}
          <hr/>
          {userToken && (
            <button
              className="btn btn-outline-primary mt-2"
              onClick={() => addToCart(data.product._id)}
            >
              Add to cart
            </button>
          )}
          <hr />
        </div>
        <div className="col-lg-12 w-100">
          <h6>Reviews</h6>
          {data.product.reviews ? (
            data.product.reviews.map((review) => (
              <div key={review._id}>
                <table className="table table-bordered w-50">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">User name</th>
                      <th scope="col">User comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{review.createdBy.userName}</td>
                      <td>{review.comment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>no reviews</p>
          )}
        </div>
        <div className="container py-5 vh-100">
        <h2 className="pb-3 text-center">write a review</h2>
        <form onSubmit={formik.handleSubmit} className="py-3 text-center m-auto w-50 form-part">
          {renderInput}
          <button className="login-btn" type="submit" disabled={!formik.isValid}>Submit review</button>
        </form>
      </div>
      </div>
    </div>
  );
}

