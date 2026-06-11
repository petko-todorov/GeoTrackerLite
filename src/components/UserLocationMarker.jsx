import { Marker } from 'react-map-gl/maplibre';
import { useStore } from '../store/useStore';

export default function UserLocationMarker() {
    const userLocation = useStore((state) => state.userLocation);
    const heading = useStore((state) => state.heading);
    const speed = useStore((state) => state.speed);
    const isTracking = useStore((state) => state.isTracking);

    if (!userLocation) return null;

    const showHeadingCone = (speed > 0.5 || isTracking) && heading !== null;

    return (
        <Marker
            longitude={userLocation.lng}
            latitude={userLocation.lat}
            anchor="center"
        >
            <div className="relative flex items-center justify-center">
                {showHeadingCone ? (
                    <div
                        className="absolute w-24 h-24 pointer-events-none"
                        style={{
                            transform: `rotate(${heading}deg)`,
                            background:
                                'conic-gradient(from -30deg at 50% 50%, rgba(59, 130, 246, 0.4) 0deg, transparent 60deg)',
                            borderRadius: '50%',
                            clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)',
                        }}
                    />
                ) : (
                    <div className="absolute rounded-full" />
                )}

                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg ring- ring-blue-500/30 z-10" />
            </div>
        </Marker>
    );
}
