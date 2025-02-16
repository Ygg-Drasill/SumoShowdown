import { PinInput } from "@/components/ui/pin-input";
import { Button, Center, Field, Input, Text, VStack } from "@chakra-ui/react";
import BasePage from "./BasePage";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosClient from "@/client";

function JoinPage() {
    const { client } = useAxiosClient()
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationKey: [`join_${code}_${name}`],
        mutationFn: async () => await client.post("/sessions/join", null, {
            params: {
                code: code,
                name: name
            }
        }),
        onSuccess: (res) => {
            console.log(res.data["token"]);
            navigate("/vote")
        },
        onError: () => {
        }
    })

    const onClickJoin = () => {
        if (code.length != 4) return
        if (name.length < 1) return
        mutate()
    }

    return (
        <BasePage>
            <Center h={"100vh"}>
                <VStack gap={4}>
                    <PinInput fontFamily={"heading"} size={"md"} onValueChange={(e) => setCode(e.valueAsString)} color={"primary"} />
                    <Field.Root color={"primary"}>
                        <Field.Label fontSize={"md"}>Name</Field.Label>
                        <Input fontSize={"md"} onChange={e => setName(e.target.value)} required borderRadius={0} placeholder="John Doe" />
                    </Field.Root>
                    <Button background={"primary"} fontSize={"md"} w={"100%"} fontFamily={"heading"} onClick={onClickJoin}>Join</Button>
                    <Text>{code}{name}</Text>
                </VStack>
            </Center>
        </BasePage>
    )
}

export default JoinPage