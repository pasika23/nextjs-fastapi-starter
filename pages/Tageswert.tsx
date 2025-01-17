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
  TextField,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { log } from "console";

const orte = ["Zch_Rosengartenstrasse", "Zch_Schimmelstrasse", "Zch_Stampfenbachstrasse"];

export default function Tageswert() {
  const [ort, setOrt] = useState("");
  const [datum, setDatum] = useState("");
  const [antwort, setAntwort] = useState([]);

  const handleSubmit = async () => {
    if (!ort || !datum) {
      alert("Bitte Ort und Datum auswählen!");
      return;
    }

    const zeitpunkt = new Date(datum).getTime();
    console.log(zeitpunkt);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/daten", {
        ort,
        zeitpunkt,
      });
      setAntwort(response.data); // response.data ist jetzt ein Array
    } catch (error) {
      if (error instanceof Error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        alert(`Fehlerdetails: ${error.message}`);
      } else {
        console.error("Unbekannter Fehler:", error);
        alert("Ein unbekannter Fehler ist aufgetreten.");
      }
    }
  };


  return (
    <Container
      maxWidth="md"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
    >
      <Paper elevation={3} style={{ padding: "30px", width: "100%" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Tageswerte suchen
        </Typography>
        <Grid container spacing={3}>
          {/* Dropdown for Location */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Ort</InputLabel>
              <Select
                value={ort}
                onChange={(e) => setOrt(e.target.value)}
              >
                {orte.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Date Picker */}
          <Grid item xs={12}>
            <TextField
              label="Datum"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              inputProps={{
                min: "2023-01-01",
                max: "2023-12-31",
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box textAlign="center">
              <Button
                variant="contained"
                sx={{
                  color: '#111111',
                  backgroundColor: '#87CEEB'
                }}
                onClick={handleSubmit}
              >
                Suche
              </Button>
            </Box>
          </Grid>
        </Grid>

        {antwort.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" align="center" gutterBottom>
              Suchergebnis für {ort} am {datum}
            </Typography>
            <Paper elevation={2} style={{ padding: "20px" }}>
              <Typography variant="subtitle1"><strong>Regendauer:</strong> {antwort[0]}h</Typography>
              <Typography variant="subtitle1"><strong>Durchschnittstemperatur:</strong> {antwort[1]}°C</Typography>
              <Typography variant="subtitle1"><strong>Höchsttemperatur:</strong> {antwort[2]}°C</Typography>
              <Typography variant="subtitle1"><strong>Luftdruck:</strong> {antwort[3]}hPa</Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

