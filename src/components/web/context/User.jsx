import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let UserContext = createContext();

export default function UserContextProvider({children}){

    // define variables that the other components can see
    // this method replaces the method of defining the token in the app component
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    // when you start set the loading to true when you recive the data make it false
    const [isloading, setIsLoading] = useState(true);
  
    const getUserData = async()=>{
        if(userToken){
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
            {headers:{Authorization:`Tariq__${userToken}`}});
            setUserData(data.user);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getUserData();
    },[userToken])

    return <UserContext.Provider value={{userToken, setUserToken,userData, setUserData,isloading}}>
            {children}
    </UserContext.Provider>
}