import { Center, IconButton } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import BasePage from "./BasePage"
import { LuPlay } from "react-icons/lu"

function HomePage() {
    const nav = useNavigate()
    return (
        <BasePage>
            <Center h={"100%"}>
                <IconButton
                    aria-label="Play"
                >
                    <LuPlay />
                </IconButton>
                <Button backgroundColor={"primary"} shadow={"default"} onClick={() => nav("/join")}>Play</Button>
            </Center>
        </BasePage>
    )
}

export default HomePage