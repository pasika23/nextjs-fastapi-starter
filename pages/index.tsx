import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import dynamic from "next/dynamic";
const Karte = dynamic(() => import("./Karte"), { ssr: false });
import Tageswert from "./Tageswert";
import Verlauf from "./Verlauf";
import Home from "./Home";

export default function Index() {

    const [tab, setTab] = useState('tab1');

    return (
        <Box sx={{ backgroundColor: '#ECEFF1', minHeight: '100vh', padding: '0', margin: '0' }}>
            <AppBar position="static" sx={{ backgroundColor: '#87CEEB' }}>
                <Toolbar sx={{ justifyContent: "space-around" }}>
                    <Button
                        onClick={() => setTab('tab1')}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: '#FFFFFF',
                            mx: 1
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        onClick={() => setTab('tab2')}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: '#FFFFFF',
                            mx: 1
                        }}
                    >
                        Tageswert
                    </Button>
                    <Button
                        onClick={() => setTab('tab3')}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: '#FFFFFF',
                            mx: 1
                        }}
                    >
                        Analyse
                    </Button>
                    <Button
                        onClick={() => setTab('tab4')}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: '#FFFFFF',
                            mx: 1
                        }}
                    >
                        Karte
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ padding: '2rem' }}> {/* Innerer Bereich */}
                {tab === 'tab1' && (<><h1><Home /></h1></>)}
                {tab === 'tab2' && (<><h1><Tageswert /></h1></>)}
                {tab === 'tab3' && (<><h1><Verlauf /></h1></>)}
                {tab === 'tab4' && (<><h1><Karte /></h1></>)}
            </Box>
        </Box>
    );
}
