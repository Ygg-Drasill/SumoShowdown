import useApiContext from "@/client";
import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

function VotePage() {
    const { client, playerToken } = useApiContext()
    const sessionId = playerToken.split(".")[0]

    const { mutate: vote } = useMutation({
        mutationKey: ["vote"],
        mutationFn: async () => await client.put(`/sessions/${sessionId}/vote`, null, {
            withCredentials: true
        })
    })
    return <Button onClick={() => vote()}>Test</Button>
}

export default VotePage