export const createMapSlice = (set) => ({
    center: { lng: 25.393, lat: 42.6194 },
    zoom: 8,
    bearing: 0,
    pitch: 0,
    isTracking: false,
    activeLayer: 'osm',
    userLocation: null,

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

    setIsTracking: (isTracking) => set({ isTracking }),
    setActiveLayer: (activeLayer) => set({ activeLayer }),
    setUserLocation: (location) => set({ userLocation: location }),
    resetBearing: () => set({ bearing: 0 }),
});
