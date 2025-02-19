import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

function BasePage({ children, pageProps }: { children: ReactNode, pageProps?: BoxProps }) {
    return <Box h="calc(var(--viewh, 1vh) * 100)" w="100%" backgroundColor={"light"} {...pageProps}>{children}</Box>
}

export default BasePage