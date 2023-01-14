import { Navigate } from "react-router-dom";
import { useAuth } from "./LoginContext";

export const Restrict = ({children}) =>{
    const auth = useAuth();
    if(!auth.email){
        return <Navigate to="/login"/>
    }
    return children
}