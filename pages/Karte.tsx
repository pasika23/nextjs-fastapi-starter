import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import Overlay from "ol/Overlay";

import { BASE_LAYERS } from "./baseLayers";

export default function Karte() {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const popupElement = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);

    useEffect(() => {
        if (mapElement.current) {
            const layers = BASE_LAYERS.map((layer) =>
                new TileLayer({
                    source: new XYZ({
                        url: layer.url,
                        attributions: layer.attribution,
                    }),
                })
            );

            const features = [
                new Feature({
                    geometry: new Point(fromLonLat([8.5261, 47.3952])),
                    name: "Zch_Rosengartenstrasse",
                }),
                new Feature({
                    geometry: new Point(fromLonLat([8.5235, 47.371])),
                    name: "Zch_Schimmelstrasse",
                }),
                new Feature({
                    geometry: new Point(fromLonLat([8.5398, 47.3868])),
                    name: "Zch_Stampfenbachstrasse",
                }),
            ];

            const vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: features,
                }),
                style: new Style({
                    image: new Icon({
                        src: "https://openlayers.org/en/latest/examples/data/icon.png",
                        scale: 1.0,
                    }),
                }),
            });

            const map = new Map({
                target: mapElement.current,
                layers: [layers[0], vectorLayer],
                view: new View({
                    center: fromLonLat([8.5417, 47.3769]),
                    zoom: 13,
                }),
            });

            const popup = new Overlay({
                element: popupElement.current || undefined,
                positioning: "bottom-center",
                stopEvent: false,
                offset: [0, -10],
            });
            map.addOverlay(popup);

            map.on("click", (event) => {
                const features = map.getFeaturesAtPixel(event.pixel);
                if (features && features.length > 0) {
                    const feature = features[0];
                    const geometry = feature.getGeometry();
                    if (geometry instanceof Point) {
                        const coordinates = geometry.getCoordinates();
                        popup.setPosition(coordinates);
                        if (popupElement.current) {
                            popupElement.current.innerHTML = feature.get("name");
                            popupElement.current.style.display = "block";
                        }
                    }
                } else {
                    if (popupElement.current) {
                        popupElement.current.style.display = "none";
                    }
                }
            });

            mapInstance.current = map;

            return () => map.setTarget(null);
        }
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <div
                ref={mapElement}
                style={{ height: "80vh", width: "80%", margin: "0 auto" }}
            ></div>
            <div
                ref={popupElement}
                style={{
                    position: "absolute",
                    backgroundColor: "white",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid black",
                    display: "none",
                    pointerEvents: "none",
                }}
            ></div>
        </div>
    );
}
