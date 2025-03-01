import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createSession } from "../../../api/sessionAPI";
import GameButton from "../../components/gameButton";
import theme from "../../theme";

const CreateGame: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const createGame = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const code = await createSession();
            navigate("/game", { state: { code } }); 
        } catch (error) {
            console.error("Failed to fetch session code:", error);
        } finally {
            setLoading(false);
        }
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
                        color: theme.palette.text.secondary,
                    }}
                >
                    Welcome to
                </Typography>
                <Typography 
                    variant="h1"
                    sx={{ fontSize: { xs: "3rem", sm: "4rem", md: "6rem" }, fontWeight: 'bold' }} 
                >
                    SUMO
                </Typography>
                <Typography 
                    variant="h1"
                    sx={{ fontSize: { xs: "3rem", sm: "4rem", md: "6rem" }, fontWeight: 'bold' }} 
                >
                    SHOWDOWN!
                </Typography>
            </Box>
            <Box sx={{padding: "20rem"}}>
            <GameButton text="Create Game!" onClick={createGame} />
            </Box>
        </Container>
    );
};

export default CreateGame;
