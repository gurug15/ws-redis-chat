import { useState } from "react"
import { SignupInputType } from "../lib/types"
import { useAuthContext } from "../context/AuthContext"
import { BACKEND_URL } from "../lib/url"

export const useSignup = ()=>{
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setAuthUser} = useAuthContext()

    const signup = async (inputs: SignupInputType)=>{
        try {
            setIsLoading(true)
            const res = await fetch(`${BACKEND_URL}/api/auth/signup`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputs)
            })
            const data = await res.json()
            if(!res.ok){
                throw new Error(data.error)
            }

            setAuthUser(data)

        } catch (error:any) {
            console.log(error.message)
        }finally{
            setIsLoading(false)
        }
    }
    return {isLoading,signup}
}