import Map, { MapProvider } from 'react-map-gl/maplibre';
import { useStore } from '../store/useStore';
import Compass from './Compass';
import NavigationControls from './NavigationControls.jsx';
import TrackingControl from './TrackingControl.jsx';
import UserLocationMarker from './UserLocationMarker.jsx';
import { useLocationTracker } from '../hooks/useLocationTracker';
import { useMapStyle } from '../hooks/useMapStyle';
import 'maplibre-gl/dist/maplibre-gl.css';

function LocationTracker() {
    useLocationTracker();
    return null;
}

export default function MapContainer() {
    const center = useStore((state) => state.center);
    const zoom = useStore((state) => state.zoom);
    const bearing = useStore((state) => state.bearing);
    const pitch = useStore((state) => state.pitch);
    const activeLayer = useStore((state) => state.activeLayer);
    const route = useStore((state) => state.route);
    const setViewState = useStore((state) => state.setViewState);

    const mapStyle = useMapStyle(activeLayer, route);

    return (
        <div className="w-full h-screen relative">
            <MapProvider>
                <Map
                    longitude={center.lng}
                    latitude={center.lat}
                    zoom={zoom}
                    bearing={bearing}
                    pitch={pitch}
                    onMove={(evt) => setViewState(evt.viewState)}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle={mapStyle}
                    minZoom={3}
                    maxZoom={18}
                    bearingSnap={30}
                    dragRotate={true}
                    touchZoomRotate={true}
                    zoomInertia={0}
                    pitchInertia={0}
                    bearingInertia={0}
                    panInertia={0}
                >
                    <LocationTracker />
                    <Compass />
                    <NavigationControls />
                    <UserLocationMarker />
                </Map>

                <TrackingControl />
            </MapProvider>
        </div>
    );
}
