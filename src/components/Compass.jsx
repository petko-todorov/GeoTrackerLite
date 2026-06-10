import { useMap } from 'react-map-gl/maplibre';
import { useStore } from '../store/useStore';

export default function Compass() {
    const { current: map } = useMap();
    let bearing = useStore((state) => state.bearing);

    if (bearing === 0) return null;

    const handleReset = () => {
        if (map) {
            map.easeTo({
                bearing: 0,
                duration: 800,
                easing: (t) => t * (2 - t),
            });
        }
    };

    return (
        <button
            onClick={handleReset}
            className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-gray-100 transition-all duration-300 active:scale-90"
        >
            <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${-bearing}deg)` }}
            >
                <path d="M12 2L15 12H9L12 2Z" fill="#ef4444" />
                <path d="M12 22L9 12H15L12 22Z" fill="#9ca3af" />
            </svg>
        </button>
    );
}
