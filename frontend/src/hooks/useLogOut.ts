import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { BACKEND_URL } from "../lib/url"

export const useLogout = ()=>{
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setAuthUser} = useAuthContext()

    const logout = async ()=>{
        try {
            setIsLoading(true)
            const res = await fetch(`${BACKEND_URL}/api/auth/logout`,{
                method: "POST"
            })
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.error)
            }

            setAuthUser(null)

        } catch (error:any) {
            console.log(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return {isLoading,logout}
}