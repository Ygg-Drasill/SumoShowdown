import { Box, Container, Typography } from "@mui/material";
import Graph from "../../components/graph";

const Dashboard: React.FC = () => {
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
                    Dashboard
                </Typography>
                <Graph />
            </Box>
        </Container>
    );
};

export default Dashboard;
