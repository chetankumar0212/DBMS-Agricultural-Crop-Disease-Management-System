import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [email,setemail] = useState(null);

    const Loginemail = (email)=>{
        setemail(email)
    }
    
    return(
        <AuthContext.Provider value={{Loginemail,email}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    return useContext(AuthContext);
}