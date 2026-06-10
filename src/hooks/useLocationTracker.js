import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useMap } from 'react-map-gl/maplibre';
import { Geolocation } from '@capacitor/geolocation';

export function useLocationTracker() {
    const { current: map } = useMap();
    const isTracking = useStore((state) => state.isTracking);
    const setUserLocation = useStore((state) => state.setUserLocation);
    const watchId = useRef(null);

    useEffect(() => {
        const startTracking = async () => {
            try {
                const permissions = await Geolocation.requestPermissions();
                if (permissions.location !== 'granted') {
                    console.error('Location permission denied');
                    return;
                }

                watchId.current = await Geolocation.watchPosition(
                    {
                        enableHighAccuracy: true,
                        timeout: 10000
                    },
                    (position) => {
                        if (position) {
                            const { longitude, latitude } = position.coords;
                            const newLocation = { lng: longitude, lat: latitude };
                            
                            setUserLocation(newLocation);

                            if (map) {
                                map.easeTo({
                                    center: [longitude, latitude],
                                    duration: 500
                                });
                            }
                        }
                    }
                );
            } catch (err) {
                console.error('Error starting location watch:', err);
            }
        };

        const stopTracking = async () => {
            if (watchId.current !== null) {
                await Geolocation.clearWatch({ id: watchId.current });
                watchId.current = null;
            }
        };

        if (isTracking) {
            startTracking();
        } else {
            stopTracking();
        }

        return () => {
            stopTracking();
        };
    }, [isTracking, map, setUserLocation]);
}
