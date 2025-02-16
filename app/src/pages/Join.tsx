import { PinInput } from "@/components/ui/pin-input";
import { Center, Field, Input, Text, VStack } from "@chakra-ui/react";
import BasePage from "./BasePage";
import { useState } from "react";

function JoinPage() {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    return (
        <BasePage>
            <Center h={"100vh"}>
                <VStack>
                    <PinInput onValueChange={(e) => setCode(e.valueAsString)} color={"primary"} />
                    <Field.Root color={"primary"}>
                        <Field.Label>Name</Field.Label>
                        <Input onChange={e => setName(e.target.value)} required borderRadius={0} placeholder="John Doe" />
                    </Field.Root>
                </VStack>
            </Center>
        </BasePage>
    )
}

export default JoinPage