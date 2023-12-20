import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import Loader from '../../loader/Loader';
import style from './Profile.module.css'
import { Link, Outlet } from 'react-router-dom';
export default function Profile() {

    // recive userData and isLoading from usercontext
    let {isloading} = useContext(UserContext);

    
    if(isloading){
        return <Loader/>
    }

    return(
        <aside className={`${style.profile}`}>
            <div className={`${style.profileLinks}`}>
                <nav>
                    <Link to='' className='text-decoration-none text-blue'>Information</Link>
                    <Link to="contact" className='text-decoration-none text-blue'>Contact</Link>
                    <Link to="order" className='text-decoration-none text-blue'>Orders</Link>
                </nav>
            </div>

            <div className={`${style.userData}`}>
                <Outlet/>
            </div>
        </aside>
    )
}
