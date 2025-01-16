import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from '@mui/material';
import FruchtListe from './fruchtliste';
import Addiere from './addiere';
import Karte from './Karte';

export default function Index() {

    const [tab, setTab] = useState('tab1');

    return (<>
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={() => setTab('tab1')}>
                    Home
                </Button>
                <Button color="inherit" onClick={() => setTab('tab2')}>
                    Frucht
                </Button>
                <Button color="inherit" onClick={() => setTab('tab3')}>
                    Addieren
                </Button>
                <Button color="inherit" onClick={() => setTab('tab4')}>
                    Karte
                </Button>
            </Toolbar>

        </AppBar>
        {tab === 'tab1' && (<><h1>Inhalt Tab 1</h1></>)}
        {tab === 'tab2' && (<><h1><FruchtListe /></h1></>)}
        {tab === 'tab3' && (<><h1><Addiere /></h1></>)}
        {tab === 'tab4' && (<><h1><Karte /></h1></>)}

    </>)
}