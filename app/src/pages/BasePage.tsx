import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

function BasePage({ children }: { children: ReactNode }) {
    return <Box h="100vh" w="100%" backgroundColor={"light"}>{children}</Box>
}

export default BasePage