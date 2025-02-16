import { Box, Container, Grid, Typography } from "@mui/material";
import GameButton from "../../components/gameButton";
import theme from "../../theme";
const players = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank"];

const StartGame: React.FC = () => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "100vh",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: "2rem", sm: "3rem", md: "5rem" },
                        fontWeight: "bold",
                        padding: "2rem",
                    }}
                >
                    Join Code:
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        fontWeight: "bold",
                        padding: "2rem",
                    }}
                >
                    {""}
                </Typography>

                <Box>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                            fontWeight: "bold",
                            paddingBottom: "1rem",
                        }}
                    >
                        Joined Players:
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "1rem",
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "10rem", sm: "15rem", md: "30rem" },
                                height: { xs: "10rem", sm: "15rem", md: "20rem" },
                                border: "3px solid black",
                                padding: "1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "1.5rem"
                            }}
                        >
                            <Grid container spacing={1} justifyContent="center">
                                {players.map((player, index) => (
                                    <Grid item xs={4} sm={3} md={2} key={index}>
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

            <Box sx={{ paddingBottom: "5rem" }}>
                <GameButton text="Start Game!" onClick={() => {}} />
            </Box>
        </Container>
    );
};

export default StartGame;
