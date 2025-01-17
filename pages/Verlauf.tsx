import React, { useState } from "react";
import {
    Container,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
} from "@mui/material";
import axios from "axios";
import { VegaLite, VisualizationSpec } from "react-vega";

type MeteorologicalEntry = {
    Datum: number;
    RainDur?: number;
    T?: number;
    T_max_h1?: number;
    p?: number;
};

const locations = ["Zch_Rosengartenstrasse", "Zch_Schimmelstrasse", "Zch_Stampfenbachstrasse"];
const metrics = [
    { key: "RainDur", label: "Regendauer" },
    { key: "T", label: "Temperatur" },
    { key: "T_max_h1", label: "Maximale Temperatur" },
    { key: "p", label: "Luftdruck" },
];

const Verlauf = () => {
    const [location, setLocation] = useState("");
    const [metric, setMetric] = useState("");
    const [chartData, setChartData] = useState<VisualizationSpec | null>(null);

    const fetchData = async () => {
        if (!location || !metric) {
            alert("Bitte Standort und Metrik auswählen!");
            return;
        }

        try {
            const response = await axios.post<MeteorologicalEntry[]>("http://127.0.0.1:8000/api/filter", {
                location,
                metric,
            });

            console.log("API Response:", response.data); // Debugging

            // Check if response is an array
            if (!Array.isArray(response.data)) {
                throw new Error("Unerwartete API-Antwort");
            }

            const data = response.data.map((entry) => ({
                date: new Date(entry.Datum).toLocaleDateString("de-DE"),
                value: entry[metric as keyof MeteorologicalEntry],
            }));

            const vegaData: VisualizationSpec = {
                data: { values: data },
                mark: "line",
                encoding: {
                    x: { field: "date", type: "ordinal", title: "Datum" },
                    y: { field: "value", type: "quantitative", title: metrics.find((m) => m.key === metric)?.label },
                },
            };

            setChartData(vegaData);
        } catch (error) {
            console.error("Fehler beim Abrufen der Daten:", error);
            if (error instanceof Error) {
                alert(`Fehler: ${error.message}`);
            } else {
                alert("Ein unbekannter Fehler ist aufgetreten.");
            }
        }
    };

    return (
        <Container
            maxWidth="md"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
        >
            <Paper elevation={3} style={{ padding: "30px", width: "100%" }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Meteorologischer Verlauf
                </Typography>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Standort</InputLabel>
                    <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                        {locations.map((loc) => (
                            <MenuItem key={loc} value={loc}>
                                {loc}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel>Meteorologischer Wert</InputLabel>
                    <Select value={metric} onChange={(e) => setMetric(e.target.value)}>
                        {metrics.map((m) => (
                            <MenuItem key={m.key} value={m.key}>
                                {m.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box textAlign="center" marginTop={3}>
                    <Button variant="contained" color="primary" onClick={fetchData}>
                        Verlauf anzeigen
                    </Button>
                </Box>

                {chartData && (
                    <Box marginTop={4}>
                        <VegaLite spec={chartData} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Verlauf;
