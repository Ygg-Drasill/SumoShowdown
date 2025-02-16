import { PinInput } from "@/components/ui/pin-input";
import { Button, Center, Field, Input, VStack } from "@chakra-ui/react";
import BasePage from "./BasePage";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/client";
import { useNavigate } from "react-router";

function JoinPage() {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: async () => await axiosClient.post("/sessions/join", null, {
            params: {
                code: code,
                name: name
            }
        }),
        onSuccess: (res) => {
            console.log(res.data["token"]);
        },
        onError: () => {

        }
    })

    const onClickJoin = () => {
        mutate()
    }

    return (
        <BasePage>
            <Center h={"100vh"}>
                <VStack>
                    <PinInput onValueChange={(e) => setCode(e.valueAsString)} color={"primary"} />
                    <Field.Root color={"primary"}>
                        <Field.Label>Name</Field.Label>
                        <Input onChange={e => setName(e.target.value)} required borderRadius={0} placeholder="John Doe" />
                    </Field.Root>
                    <Button onClick={onClickJoin}>Join</Button>
                </VStack>
            </Center>
        </BasePage>
    )
}

export default JoinPage