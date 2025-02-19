import { ReactNode, useEffect, useState } from "react"
import axios from "axios"
import { ApiContext } from "./client"

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export function ApiContextProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState("")

    useEffect(() => {
        if (token.length === 0) return
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, [token])

    return (
        <ApiContext.Provider value={{
            setPlayerToken: setToken,
            playerToken: token,
            client: axiosClient
        }}>{children}</ApiContext.Provider>
    )
}