import { Box, Container, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import GameButton from "../../components/gameButton";
import theme from "../../theme";

const players = ["Alice", "Bob", "Christoffer", "David", "Eve", "Frank", "Grace", "Hank"];




const StartGame: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gameCode = location.state?.code || "Loading Code.."; 

    const RunGame = () => {
        navigate("/dashboard")
    }

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "center",
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: "2rem", sm: "3rem", md: "5rem" },
                        fontWeight: "bold",
                    }}
                >
                    Join Code:
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        fontWeight: "bold",
                    }}
                >
                    {gameCode}
                </Typography>

                <Box sx={{padding: "4rem"}}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                            fontWeight: "bold",
                        }}
                    >
                        Joined Players:
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                border: "3px solid black",
                                padding: "2rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "1.5rem"
                            }}
                        >
                            <Grid container spacing={1} justifyContent="center">
                                {players.map((player, index) => (
                                    <Grid item xs={4} sm={3} md={3} key={index}>
                                        <Box
                                            sx={{
                                                padding: "0.5rem 1rem",
                                                border: "2px solid black",
                                                borderRadius: "5px",
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: '#FFFAF0',
                                                bgcolor: theme.palette.primary.main
                                            }}
                                        >
                                            {player}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <GameButton text="Start Game!" onClick={() => {RunGame()}} />
        </Container>
    );
};

export default StartGame;
