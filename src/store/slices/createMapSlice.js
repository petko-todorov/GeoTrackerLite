export const createMapSlice = (set) => ({
    center: [42.6194, 25.393],
    zoom: 8,
    isTracking: false,
    activeLayer: 'osm',

    setMapPosition: (center, zoom) => set({ center, zoom }),
    setIsTracking: (isTracking) => set({ isTracking }),
    setActiveLayer: (activeLayer) => set({ activeLayer }), 
});
