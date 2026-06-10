import Map, { MapProvider, Marker } from 'react-map-gl/maplibre';
import { useStore } from '../store/useStore';
import Compass from './Compass';
import NavigationControls from './NavigationControls.jsx';
import { useLocationTracker } from '../hooks/useLocationTracker';
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
    const userLocation = useStore((state) => state.userLocation);
    const setViewState = useStore((state) => state.setViewState);

    const mapStyle =
        activeLayer === 'osm'
            ? {
                  version: 8,
                  sources: {
                      'osm-tiles': {
                          type: 'raster',
                          tiles: [
                              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                          ],
                          tileSize: 256,
                          attribution: '&copy; OpenStreetMap contributors',
                      },
                  },
                  layers: [
                      {
                          id: 'osm-layer',
                          type: 'raster',
                          source: 'osm-tiles',
                          minzoom: 0,
                          maxzoom: 19,
                      },
                  ],
              }
            : {
                  version: 8,
                  sources: {
                      'satellite-tiles': {
                          type: 'raster',
                          tiles: [
                              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                          ],
                          tileSize: 256,
                          attribution: 'Tiles &copy; Esri',
                      },
                  },
                  layers: [
                      {
                          id: 'satellite-layer',
                          type: 'raster',
                          source: 'satellite-tiles',
                          minzoom: 0,
                          maxzoom: 19,
                      },
                  ],
              };

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

                    {userLocation && (
                        <Marker
                            longitude={userLocation.lng}
                            latitude={userLocation.lat}
                        >
                            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg ring-4 ring-blue-500/30"></div>
                        </Marker>
                    )}
                </Map>
            </MapProvider>
        </div>
    );
}
