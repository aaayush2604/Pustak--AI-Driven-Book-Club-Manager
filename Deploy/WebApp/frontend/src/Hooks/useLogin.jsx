import { useState } from "react";
import toast from 'react-hot-toast';
import {useAuthContext} from '../context/AuthContext.jsx'

const handleInputErrors = (
    username,
    password
  ) => {
    if (!username || !password) {
      toast.error("All Fields are not Filled");
      return false;
    }
  
    return true;
  };

const useLogin= ()=>{
    const [loading, setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();
    const login= async(email, password)=>{
        const success=handleInputErrors(email,password);
        if(!success)return;
        setLoading(true);
        try{
            console.log(email, password);
            const res=await fetch("http://localhost:8000/user/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password}),
            })
            const data=await res.json();
            if(data.error){
                console.log(data.error);
                throw new Error(data.error);
            }
            localStorage.setItem("user",JSON.stringify(data));
            setAuthUser(data);
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
        
    }
    return {loading, login};
}

export default useLogin;