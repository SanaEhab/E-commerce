import React, { useContext } from "react";
import Input from "../../pages/Input";
import { useFormik } from "formik";
import { loginSchema } from "../validation/Validation";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";


export default function Login() {

  const navigate = useNavigate();
  let {userToken, setUserToken} = useContext(UserContext);
// to stay loged in when you do refresh
  if(userToken){
    navigate(-1);
  }
  
  const initialValues = {
    email: "",
    password: "",
  }


  const onSubmit = async values=>{
    const {data} = await axios.post(`https://ecommerce-node4.vercel.app/auth/signin `, values);

    if(data.message=="success"){
      // to store the data in the browser
      localStorage.setItem("userToken",data.token);
      setUserToken(data.token);
      toast.success('Login successfully', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

        navigate("/");
    }

  }
  

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginSchema,
  });


  const inputs = [
    {
      id: "email",
      type: "email",
      name: "email",
      title: "user email",
      value: formik.values.email,
    },
    {
      id: "password",
      type: "password",
      name: "password",
      title: "user password",
      value: formik.values.password,
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
      <div className="container py-5 vh-100">
        <h2 className="pb-3 text-center">Login</h2>
        <form onSubmit={formik.handleSubmit} className="py-3 text-center m-auto w-50 form-part">
          {renderInput}
          <button className="login-btn" type="submit" disabled={!formik.isValid}>Login</button>
        </form>
        <Link className="text-decoration-none text-blue d-flex justify-content-center pt-5" to='/sendcode'>Forget password!</Link>
      </div>
    </>
  );
}
