import * as yup from 'yup';

export const registerSchema = yup.object({

    userName: yup.string().required("username is required").min(3,"must be at least 3 char").max(20,"must be at maximum 20 char"),
    email: yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(20,"must be at maximum 20 char")
    
})

export const loginSchema = yup.object({
    
    email: yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(20,"must be at maximum 20 char")
    
})

export const sendCodeSchema = yup.object({
    
    email: yup.string().required("email is required").email()
    
})
export const forgetPassSchema = yup.object({
    email: yup.string().required("email is required").email(),
    password:yup.string().required("password is required").min(3,"must be at least 3 char").max(20,"must be at least 20 char"),
    code: yup.string().required("code is required").min(4,"must be at least 4 char").max(4,"must be at maximum 4 char")
})

export const orderSchema = yup.object({
    address: yup.string().required("your address is required"),
    phone: yup.string().required("your address is required").max(10,"you number must be at maximum 10 char")
})