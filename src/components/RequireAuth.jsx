import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router";

const RequireAuth = ({children}) => {
    const {user} = useContext(UserContext)
    if(!user){
        return <Navigate to = "/login"></Navigate>
    }else{
        <Navigate to = "/"></Navigate>
    }
    return children

}

export default RequireAuth;