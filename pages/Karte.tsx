import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import { BASE_LAYERS } from "./baseLayers";

const OUTER_BOUNDS: [[number, number], [number, number]] = [
    [47.2, 8.4],
    [47.5, 8.7],
];




// function Popup({ properties, geometry }) {
//   const [lon, lat, depth] = geometry.coordinates;

//   return (
//     <>
//       <Typography variant="h2">{properties.place}</Typography>
//       <p>
//         <span style={{ fontWeight: "bold" }}>MAGNITUDE</span>: {properties.mag}
//         <br />
//         <span style={{ fontWeight: "bold" }}>DEPTH</span>: {depth} km
//         <br />
//         <span style={{ fontWeight: "bold" }}>TYPE</span>: {properties.type}
//         <br />
//         <span style={{ fontWeight: "bold" }}>Lon/Lat</span>: {lon}, {lat}
//       </p>
//       <Typography variant="h3">
//         <Link variant="h3" target="_blank" href={properties.url}>
//           More info
//         </Link>
//       </Typography>
//     </>
//   );
// }

function Karte() {
    return (
        <div style={styles.pageWrapper}>
            <div style={styles.mapBox}>
                <MapContainer
                    style={styles.map}
                    center={[47.3769, 8.5417]} // Zentrum von Zürich
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