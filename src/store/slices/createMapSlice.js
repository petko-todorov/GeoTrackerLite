export const createMapSlice = (set) => ({
    center: { lng: 25.393, lat: 42.6194 },
    zoom: 8,
    bearing: 0,
    pitch: 0,
    isTracking: false,
    activeLayer: 'osm',
    userLocation: null,
    heading: null,
    speed: 0,
    route: [],
    sessionId: null,

    setViewState: (viewState) => {
        const clampedZoom = Math.min(Math.max(viewState.zoom, 3), 18);
        const adjustedBearing =
            Math.abs(viewState.bearing) < 15 ? 0 : viewState.bearing;

        set({
            center: { lng: viewState.longitude, lat: viewState.latitude },
            zoom: clampedZoom,
            bearing: adjustedBearing,
            pitch: viewState.pitch,
        });
    },

    setIsTracking: (isTracking) => {
        if (isTracking) {
            set({ route: [], sessionId: Date.now().toString(), isTracking: true });
        } else {
            set({ route: [], isTracking: false });
        }
    },
    setActiveLayer: (activeLayer) => set({ activeLayer }),
    setUserLocation: (location, heading = null, speed = 0) => {
        set((state) => {
            const newState = { userLocation: location, heading, speed };

            if (state.isTracking) {
                const newRoute = [...state.route, [location.lng, location.lat]];
                newState.route = newRoute;

                if (state.sessionId) {
                    const rawHistory = localStorage.getItem('gps_history');
                    let history = rawHistory ? JSON.parse(rawHistory) : [];

                    const sessionData = {
                        id: state.sessionId,
                        timestamp: parseInt(state.sessionId),
                        points: newRoute,
                    };

                    const index = history.findIndex(
                        (s) => s.id === state.sessionId,
                    );
                    if (index >= 0) {
                        history[index] = sessionData;
                    } else {
                        history.unshift(sessionData);
                    }

                    if (history.length > 10) {
                        history = history.slice(0, 10);
                    }

                    localStorage.setItem(
                        'gps_history',
                        JSON.stringify(history),
                    );
                }
            }

            return newState;
        });
    },
    resetBearing: () => set({ bearing: 0 }),
});
