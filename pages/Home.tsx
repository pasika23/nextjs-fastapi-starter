import React from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <Typography variant="h1" gutterBottom>
                Willkommen auf Meteo23
            </Typography>
            <Typography variant="h3" gutterBottom>
                Meteodaten 2023 aus der Stadt Zürich
            </Typography>
            <Typography variant="h5" gutterBottom>
                Verfügbare Standorte unter Karte ersichtlich
            </Typography>
            <Typography variant="body1">
                Hosted by Pascal Kalbermatten
            </Typography>
        </Box>
    );
};

