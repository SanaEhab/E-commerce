import axios from 'axios'
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import Input from '../../pages/Input.jsx';
import { orderSchema } from '../validation/Validation.js';
import { toast } from 'react-toastify';

import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';


export default function Order() {


    const {getCartContext} = useContext(CartContext);
    const getCartData = async ()=>{
        const response = await getCartContext();
        return response;
    }
    const { data} = useQuery("Cart", getCartData);

    const initialValues ={
        couponName:"",
        address:"",
        phone:"",
    }

    const onSubmit = async values=>{

        const token = localStorage.getItem("userToken");
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`, values,
        {headers:{Authorization:`Tariq__${token}`}});
        if(data.message=="success"){
            formik.resetForm();
            toast.success('Order has been submited', {
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

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: orderSchema,
    })

    const inputs =[
        {
            id: "address",
            type: "text",
            name: "address",
            title: "user address",
            value: formik.values.address,
        },
        {
            id: "phone",
            type: "number",
            name: "phone",
            title: "user phone number",
            value: formik.values.phone,
        },
        {
            id: "couponName",
            type: "text",
            name: "couponName",
            title: "Coupon",
            value: formik.values.couponName,
        },

    ];

    const renderInput = inputs.map((ele, index) => (
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
    <div className='container'>
    <div className='row'>
        <div className='view-order d-flex flex-wrap'>
            {data?.products && (data.products.map((product) => (
                <div className="products-info mt-3 col-lg-4" key={product._id}>
                    <div className='product-image text-center'>
                    <img src={product.details.mainImage.secure_url} className='rounded-5 w-30 mb-3' alt={product.details.name} />
                    </div>
                    <div className='product-info text-center'>
                        <h6 className='text-blue'>{product.details.name}</h6>
                        <h6 className='text-blue'>Quantity: {product.quantity}</h6>
                    </div>
                </div>
            )))}
        </div>
            <div className='order-form my-5'>
            <form onSubmit={formik.handleSubmit} className="py-3 text-center m-auto w-50 form-part">
                {renderInput}
            <button className="login-btn" type="submit" disabled={!formik.isValid}>
                <Link className='text-decoration-none text-black' to='/profile/order'> Submit your order</Link>
            </button>
            </form>
            </div>
        </div>
    </div>
  )
}
