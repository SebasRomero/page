import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext()

const UserProvider = (props) => {
    const [user, setUser] = useState(false)

    useEffect(() => {
        const unSuscribe = onAuthStateChanged(auth, user => {
            console.log(user)
            if (user){
                const {email, uid} = user 
                setUser({email, uid})
            }else {
                setUser(null)
            }
        }) 

        return () => unSuscribe()
    }, [])

    const userRegister = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password)

    const userLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

    const signOutUser = () => signOut(auth);
    
    return(
    <UserContext.Provider value={{user, setUser, userRegister, userLogin, signOutUser}}>
        {props.children}
    </UserContext.Provider>
    )
}

export default UserProvider;