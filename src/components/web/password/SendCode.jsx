import React, { useContext, useState } from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { sendCodeSchema } from "../validation/Validation";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



export default function SendCode() {

    const navigate = useNavigate();

  const initialValues = {
    email: "",
  }


  const onSubmit = async values=>{

    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, values);
    if(data.message=="success"){
        toast.success('Code sended successfully, check your email', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    
            navigate("/forgetpass");
    }
  }
  

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: sendCodeSchema,
  });


  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "user email",
      value: formik.values.email,
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
    <>
      <div className="container py-5">
        <h2 className="pb-3 text-center">Enter you email</h2>
        <form onSubmit={formik.handleSubmit} className="py-3 text-center m-auto w-50 form-part">
          {renderInput}
          <button className="login-btn" type="submit" disabled={!formik.isValid}>Send code</button>
        </form>
      </div>
    </>
  );
}
