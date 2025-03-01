import { Box, Container, Typography } from "@mui/material";
import GameButton from "../../components/gameButton";
import theme from "../../theme";

<<<<<<< HEAD
const CreateGame = () => {
=======
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
>>>>>>> feature/issue-1/folder-structure

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
<<<<<<< HEAD
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }, fontWeight: 'bold', padding: '2rem' }} 
=======
                    sx={{
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                        fontWeight: "bold",
                        padding: "2rem",
                        color: theme.palette.text.secondary,
                    }}
>>>>>>> feature/issue-1/folder-structure
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
<<<<<<< HEAD
            <GameButton text="Create Game!" onClick={() => {}} />
=======
            <Box sx={{padding: "20rem"}}>
            <GameButton text="Create Game!" onClick={createGame} />
            </Box>
>>>>>>> feature/issue-1/folder-structure
        </Container>
    );
};

export default CreateGame;
