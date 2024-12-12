import { useState } from "react"
import { LoginInputType } from "../lib/types"
import { useAuthContext } from "../context/AuthContext"
import { BACKEND_URL } from "../lib/url"
import toast from "react-hot-toast"

export const useLogin = ()=>{
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setAuthUser} = useAuthContext()

    const login = async (inputs: LoginInputType)=>{
        try {
            setIsLoading(true)
            const res = await fetch(`${BACKEND_URL}/api/auth/login`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputs),
                credentials:"include"
            })
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.error)
            }

            setAuthUser(data)

        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return {isLoading,login}
}