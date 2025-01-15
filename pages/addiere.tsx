import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper } from '@mui/material';

const Addiere = () => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [result, setResult] = useState(null);

    const handleAdd = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/add?a=${a}&b=${b}`);
            setResult(response.data.sum);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    return (
        <Paper elevation={3}
            style={{ padding: '20px', margin: '20px', maxWidth: '400px' }}>
            <Typography variant="h5">Addition von Zahlen</Typography>

            <TextField
                label="Zahl A"
                value={a}
                onChange={(e) => setA(parseInt(e.target.value, 10) || 0)}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Zahl B"
                value={b}
                onChange={(e) => setB(parseInt(e.target.value, 10) || 0)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAdd}>
                Addieren
            </Button>

            {result !== null && (
                <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                    Das Ergebnis ist: {result}
                </Typography>
            )}
        </Paper>
    );
};

export default Addiere; 