import { useNavigate,Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const useLogOut=()=>{
    const navigate=useNavigate();
    const {setAuthUser}=useAuthContext();
    const logout=()=>{
    
        //remove user from storage
        localStorage.removeItem('user')
        setAuthUser(null);
        return <Navigate to="/login" replace />;
    }

    return {logout};
}
