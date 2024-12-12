import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../lib/url";

interface AuthUserType {
    id: string;
    fullName: string;
    username: string;
    profilePic: string;
    gender: string
}


const AuthContext = createContext<{
    authUser: AuthUserType | null
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>
    isLoading: boolean
}>({
    authUser: null,
    setAuthUser: ()=>{},
    isLoading: true
})

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}:{children:ReactNode})=>{
     const [authUser,setAuthUser] = useState<AuthUserType | null>(null)
     const [isLoading,setIsLoading] = useState<boolean>(true)
     

     useEffect(()=>{
        const fetchAuthUser = async ()=>{
            try {
                const res = await fetch(`${BACKEND_URL}/api/auth/me`,{
                    credentials: "include"
                })
                const data = await res.json()
                console.log(data)
                if(!res.ok){
                    throw new Error(data.error)
                }
                setAuthUser(data)
            } catch (error) {
                console.log("error in fetch me: ",error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchAuthUser()
     },[])

    return <AuthContext.Provider value={{
        authUser,
        setAuthUser,
        isLoading,
    }}>{children}</AuthContext.Provider>
}