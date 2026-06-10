import { useMapEvents } from 'react-leaflet';
import { useStore } from '../store/useStore';

export function useMapEventsHandler() {
    const setMapPosition = useStore((state) => state.setMapPosition);

    useMapEvents({
        moveend: (e) => {
            const map = e.target;
            const center = map.getCenter();
            let zoom = map.getZoom();

            if (zoom < 3) {
                zoom = 3;
                map.setZoom(3);
            } else if (zoom > 19) {
                zoom = 19;
                map.setZoom(19);
            }

            setMapPosition([center.lat, center.lng], zoom);
        },
    });

    return null;
}
