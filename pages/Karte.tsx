import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BASE_LAYERS } from "./baseLayers";
import { LatLngBoundsLiteral } from "leaflet";

const OUTER_BOUNDS: LatLngBoundsLiteral = [
    [47.2, 8.4], // Südwestliche Ecke
    [47.5, 8.7], // Nordöstliche Ecke
];

function Karte() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Avoid rendering anything during SSR
    }

    return (
        <div style={{ height: "80vh", width: "80%", margin: "0 auto", background: "#f9f9f9" }}>
            <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={[47.3769, 8.5417]} // Zürich Zentrum
                zoom={13}
                minZoom={10}
                maxBounds={OUTER_BOUNDS}
                maxBoundsViscosity={1}
            >
                <LayersControl position="topright">
                    {BASE_LAYERS.map((baseLayer) => (
                        <LayersControl.BaseLayer
                            key={baseLayer.url}
                            checked={baseLayer.checked}
                            name={baseLayer.name}
                        >
                            <TileLayer attribution={baseLayer.attribution} url={baseLayer.url} />
                        </LayersControl.BaseLayer>
                    ))}
                </LayersControl>
            </MapContainer>
        </div>
    );
}




// CSS-in-JS styles
const styles = {
    pageWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Vollbildhöhe für zentrierte Position
        backgroundColor: "#f9f9f9", // Hintergrundfarbe (Weißraum)
    },
    mapBox: {
        width: "600px", // Breite der Box
        height: "400px", // Höhe der Box
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Schatten für die Box
        borderRadius: "10px", // Abgerundete Ecken
        overflow: "hidden", // Verhindert, dass Inhalte aus der Box herausragen
        backgroundColor: "#fff", // Hintergrund der Box
    },
    map: {
        width: "100%", // Karte füllt die Box vollständig aus
        height: "100%",
    },
};

export default Karte;