import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import Loader from '../../loader/Loader';
import { Link, Outlet } from 'react-router-dom';
import style from './Profile.module.css'
export default function Profile() {

    // recive userData and isLoading from usercontext
    const {isloading} = useContext(UserContext);
    
    if(isloading){
        return <Loader/>
    }

    return(
        <aside className={`${style.profile}`}>
            <div className={`${style.profileLinks}`}>
                <nav>
                    <Link to='' className='text-decoration-none text-blue'>Information</Link>
                    <hr className={`${style.borders}`}/>
                    <Link to="contact" className='text-decoration-none text-blue'>Contact</Link>
                    <hr className={`${style.borders}`}/>
                    <Link to="order" className='text-decoration-none text-blue'>Orders</Link>
                    <hr className={`${style.borders}`}/>
                </nav>
            </div>

            <div className={`${style.userData}`}>
                <Outlet/>
            </div>
        </aside>
    )
}
