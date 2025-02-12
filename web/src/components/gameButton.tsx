import { Box, Button } from "@mui/material";
import theme from "../theme";

interface GameButtonProps {
    text: string;
    onClick: () => void;
}

const GameButton: React.FC<GameButtonProps> = ({ text, onClick }) => {

    return (
        <Box mt={4}>
            <Button
                variant="contained"
                onClick={onClick}
                sx={{
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "1.5rem",
                    width: { xs: "80vw", sm: "60vw", md: "30rem" },
                    height: { xs: "4rem", sm: "6rem", md: "15rem" },
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                    fontWeight: "bold",
                    "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                    },
                }}
            >
                {text}
            </Button>
        </Box>
    );
};

export default GameButton;
