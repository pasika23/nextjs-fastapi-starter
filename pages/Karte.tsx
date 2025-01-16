import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BASE_LAYERS } from "./baseLayers";
import { LatLngBoundsLiteral } from "leaflet";

const OUTER_BOUNDS: LatLngBoundsLiteral = [
    [47.2, 8.4],
    [47.5, 8.7],
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
        <div style={{ height: "80vh", width: "80%", margin: "0 auto" }}>
            <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={[47.3769, 8.5417]}
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

export default Karte;
