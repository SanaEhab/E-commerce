import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import './../../../index.css'
export default function Profile() {

    let {userData} = useContext(UserContext);

    return(
        <div className='profile'>
            {userData&&
            <div key={userData._id} className='d-flex'>
            <img src={userData.image.secure_url} className='mt-2'/>
            <div className='my-auto ms-5 text-blue'>
            <h4>{userData.userName}</h4>
            <h4>{userData.email}</h4>
            <h4>{userData.status}</h4>
            </div>
            </div>
            }
        
        </div>
    )
}
