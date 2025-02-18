import useApiContext from "@/client";
import { Box, Button, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import BasePage from "./BasePage";

function VotePage() {
    const [voted, setVoted] = useState(false)
    const [prediction, setPrediction] = useState<string>()
    const { client, playerToken } = useApiContext()
    const sessionId = playerToken.split(".")[0]

    const { mutate: vote, isPending } = useMutation({
        mutationKey: ["vote"],
        mutationFn: async (pred: string) => {
            if (voted || (pred != "left" && pred != "right")) return
            setPrediction(pred)
            await client.put(`/sessions/${sessionId}/vote`, null, {
                params: {
                    prediction: pred
                },
                withCredentials: true
            })
        },
        onSuccess: () => {
            setVoted(true)
        },
        onError: () => {
            setPrediction(undefined)
        }
    })

    if (isPending) return <Spinner />

    if (voted && prediction != undefined) {
        return <BasePage><Text>{prediction}</Text></BasePage>
    }

    return (
        <BasePage>
            <VStack w="full" h="full" gap="xl" padding="lg">
                <Heading lineHeight="moderate" textAlign="center" color="primary">Choose a rikishi!</Heading>
                <Text>Round { }</Text>
                <HStack w="full" h="full" gap="lg">
                    <Box w="50%" h="full">
                        <Button disabled={voted} backgroundColor="light" color="dark" w="full" h="full" fontSize="4xl" border="default" onClick={() => vote("left")}>Left</Button>
                    </Box>
                    <Box w="50%" h="full" >
                        <Button disabled={voted} backgroundColor="light" color="dark" w="full" h="full" fontSize="4xl" border="default" onClick={() => vote("right")}>Right</Button>
                    </Box>
                </HStack>
            </VStack>
        </BasePage >
    )
}

export default VotePage