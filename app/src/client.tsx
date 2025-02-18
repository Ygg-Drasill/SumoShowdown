import { createContext, useContext } from "react"
import { AxiosInstance } from "axios"


interface ApiContextInterface {
    setPlayerToken: React.Dispatch<React.SetStateAction<string>>
    playerToken: string
    client: AxiosInstance
}

export const ApiContext = createContext<ApiContextInterface | undefined>(undefined)

function useApiContext(): ApiContextInterface {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error("useApiContext must be used within a ApiContextProvider");
    }
    return context;
}

export default useApiContext