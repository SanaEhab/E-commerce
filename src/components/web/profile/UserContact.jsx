import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import Loader from '../../loader/Loader';

export default function UserContact() {

    let {userData,isLoading} = useContext(UserContext);

    if(isLoading){
        return <Loader/>
    }

  return (
    <div className='pt-5'>
        <a href="mailto:sana.aljoubeh@gmail.com" className='text-decoration-none text-blue'>Email: {userData.email}</a>
    </div>
  )
}
