import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useMapEventsHandler } from '../hooks/useMapEventsHandler';
import 'leaflet/dist/leaflet.css';

function MapEvents() {
    useMapEventsHandler();
    return null;
}

function ZoomLimits() {
    const map = useMap();
    useEffect(() => {
        map.setMinZoom(3);
        map.setMaxZoom(19);
    }, [map]);
    return null;
}

export default function MapContainer() {
    const center = useStore((state) => state.center);
    const zoom = useStore((state) => state.zoom);
    const activeLayer = useStore((state) => state.activeLayer);

    return (
        <div className="w-full h-screen relative">
            <LeafletMap
                center={center}
                zoom={zoom}
                minZoom={3}
                maxZoom={19}
                className="w-full h-full z-0"
                zoomControl={false}
            >
                <ZoomLimits />
                <MapEvents />

                {activeLayer === 'osm' ? (
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                        maxNativeZoom={19}
                    />
                ) : (
                    <TileLayer
                        attribution="Tiles &copy; Esri"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        maxZoom={19}
                        maxNativeZoom={19}
                    />
                )}
            </LeafletMap>
        </div>
    );
}
