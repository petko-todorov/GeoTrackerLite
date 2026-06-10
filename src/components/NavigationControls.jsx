import { useMap } from 'react-map-gl/maplibre';
import { useStore } from '../store/useStore';
import { Geolocation } from '@capacitor/geolocation';

export default function NavigationControls() {
    const { current: map } = useMap();
    const setUserLocation = useStore((state) => state.setUserLocation);
    const zoom = useStore((state) => state.zoom);

    const handleZoomIn = () => {
        if (map) map.zoomIn({ duration: 300 });
    };

    const handleZoomOut = () => {
        if (map) map.zoomOut({ duration: 300 });
    };

    const handleCenterLocation = async () => {
        try {
            const coordinates = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
            });

            const { longitude, latitude } = coordinates.coords;
            setUserLocation({ lng: longitude, lat: latitude });

            if (map) {
                map.easeTo({
                    center: [longitude, latitude],
                    zoom: zoom,
                    duration: 1500,
                });
            }
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    return (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
            <button
                onClick={handleCenterLocation}
                className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center border border-gray-100 text-indigo-600 active:scale-90 transition-all"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                </svg>
            </button>

            <button
                onClick={handleZoomIn}
                className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center border border-gray-100 text-gray-700 font-bold text-2xl active:scale-90 transition-all"
            >
                +
            </button>

            <button
                onClick={handleZoomOut}
                className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center border border-gray-100 text-gray-700 font-bold text-2xl active:scale-90 transition-all"
            >
                −
            </button>
        </div>
    );
}
