import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import Loader from '../../loader/Loader';

export default function UserInfo() {

    let {userData, isLoading} = useContext(UserContext);
    if(isLoading){
        return <Loader/>
    }

  return (
    <div className='pt-5'>
        <h3 className='text-blue'>{userData.userName}</h3>
        <img src={userData.image.secure_url} alt={userData.userName} className='mt-4'/>
    </div>
  )
}
