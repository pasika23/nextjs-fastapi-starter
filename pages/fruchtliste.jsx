import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import axios from 'axios';

const FruchtListe = () => {
    const [fruechte, setFruechte] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/list');
                setFruechte(response.data.liste);
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Paper elevation={3} style={{
            padding: '20px', margin:
                '20px', maxWidth: '400px'
        }}>
            <Typography variant="h5">Früchte Liste</Typography>
            <List>
                {fruechte.map((frucht, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={frucht} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default FruchtListe;