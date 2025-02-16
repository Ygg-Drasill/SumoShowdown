import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GameButton from "../../components/gameButton";

const CreateGame: React.FC = () => {
    const navigate = useNavigate();

    const handleStartGame = () => {
        navigate("/game");
    };

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                minHeight: "100vh",
                textAlign: "center",
            }}
        >
            <Box>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        fontWeight: "bold",
                        padding: "2rem",
                    }}
                >
                    Welcome to
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
                        fontWeight: "bold",
                    }}
                >
                    SUMO
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
                        fontWeight: "bold",
                    }}
                >
                    SHOWDOWN!
                </Typography>
            </Box>
            <GameButton text="Create Game!" onClick={handleStartGame} />
        </Container>
    );
};

export default CreateGame;
