import React, { useState } from "react";
import { Container, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button, Grid, Box } from "@mui/material";
import { VegaLite } from "react-vega";
import axios from "axios";

const locations = ["Zch_Rosengartenstrasse", "Zch_Schimmelstrasse", "Zch_Stampfenbachstrasse"];
const parameters = [
    { value: "RainDur", label: "Regendauer" },
    { value: "T", label: "Durchschnittstemperatur" },
    { value: "T_max_h1", label: "Höchsttemperatur" },
    { value: "p", label: "Luftdruck" },
];

const Verlauf = () => {
    const [ort, setOrt] = useState("");
    const [parameter, setParameter] = useState("");
    const [data, setData] = useState([]);

    const handleFetch = async () => {
        if (!ort || !parameter) {
            alert("Bitte alle Dropdowns ausfüllen!");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/verlauf", {
                ort,
                parameter,
            });
            if (response.data.error) {
                alert(`Fehler: ${response.data.error}`);
                return;
            }
            setData(response.data);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Fehler beim Abrufen der Daten:", error.message);
                alert(`Fehlerdetails: ${error.message}`);
            } else {
                console.error("Unbekannter Fehler:", error);
                alert("Ein unbekannter Fehler ist aufgetreten.");
            }
        }
    };

    const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        width: "container",
        height: 400,
        mark: "line",
        encoding: {
            x: { field: "Datum", type: "temporal", title: "Datum" },
            y: { field: parameter, type: "quantitative", title: parameters.find(p => p.value === parameter)?.label || parameter },
        },
        data: { values: data },
    };

    return (
        <Container
            maxWidth="md"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
        >
            <Paper elevation={3} style={{ padding: "30px", width: "100%" }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Verlauf der Meteodaten
                </Typography>

                <Grid container spacing={3}>
                    {/* Location Dropdown */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Ort</InputLabel>
                            <Select value={ort} onChange={(e) => setOrt(e.target.value)}>
                                {locations.map((loc) => (
                                    <MenuItem key={loc} value={loc}>
                                        {loc}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Parameter Dropdown */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Meteowert</InputLabel>
                            <Select value={parameter} onChange={(e) => setParameter(e.target.value)}>
                                {parameters.map((param) => (
                                    <MenuItem key={param.value} value={param.value}>
                                        {param.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Fetch Button */}
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Button variant="contained" color="primary" onClick={handleFetch}>
                                Daten abrufen
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Visualization */}
                {data.length > 0 && (
                    <Box mt={4}>
                        <Typography variant="h6" align="center" gutterBottom>
                            {parameters.find(p => p.value === parameter)?.label || parameter}verlauf für {ort}
                        </Typography>
                        <VegaLite spec={spec} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Verlauf;
