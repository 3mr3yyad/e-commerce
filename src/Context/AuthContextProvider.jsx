import { jwtDecode } from 'jwt-decode';
import  { createContext, useEffect, useState } from 'react'
export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    let [token, setToken] = useState(null)
    let [userData, setUserData] = useState(null)

    useEffect(() => {
        let tokenStorage = localStorage.getItem("token")
        if (tokenStorage) {
            setToken(tokenStorage)
            decodeData(tokenStorage)
        }
    }, []);

    function decodeData(token) {
        let data = jwtDecode(token)
        setUserData(data)
    }
    
    return (
        <AuthContext.Provider value={{ token, setToken, decodeData, userData }}>
            {children}
        </AuthContext.Provider>
    )
}
