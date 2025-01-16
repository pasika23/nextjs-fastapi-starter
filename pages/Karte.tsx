import { renderToString } from "react-dom/server";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";
import { BASE_LAYERS } from "./baseLayers";
import { nanoid } from "nanoid";

const OUTER_BOUNDS = [
    [-80, -180],
    [80, 180],
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
        <>
            <MapContainer
                style={{ height: "80vh" }}
                center={[0, 0]}
                zoom={3}
                minZoom={2}
                maxBounds={OUTER_BOUNDS}
                maxBoundsViscosity={1}
            >
                <LayersControl position="topright">
                    {BASE_LAYERS.map(baseLayer => (
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
        </>
    );
}

export default Karte;