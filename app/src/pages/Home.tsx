import { VStack } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Navigate, useNavigate } from "react-router"

function HomePage() {
    const nav = useNavigate()
    return (
        <VStack>
            <Button backgroundColor={"primary"} shadow={"default"} onClick={() => nav("/join")}>Play</Button>
        </VStack>
    )
}

export default HomePage