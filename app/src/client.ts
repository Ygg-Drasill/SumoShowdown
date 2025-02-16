import axios, { AxiosInstance } from "axios"
import { useState } from "react"

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

interface axiosClientInterface {
    setPlayerToken: React.Dispatch<React.SetStateAction<string>>
    playerToken: string
    client: AxiosInstance
}

function useAxiosClient(): axiosClientInterface {
    const [token, setToken] = useState("")
    
    return {
        setPlayerToken: setToken,
        playerToken: token,
        client: axiosClient
    }
}

export default useAxiosClient