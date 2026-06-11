import { useMemo } from 'react';

const OSM_STYLE = {
    version: 8,
    sources: {
        'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
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
};

const SATELLITE_STYLE = {
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

const ROUTE_LAYER = {
    id: 'route-layer',
    type: 'line',
    source: 'route-source',
    paint: {
        'line-color': '#00ff00', // Neon Green for high visibility
        'line-width': 5,
    },
    layout: {
        'line-cap': 'round',
        'line-join': 'round',
    },
};

export function useMapStyle(activeLayer, route) {
    return useMemo(() => {
        const baseStyle =
            activeLayer === 'osm'
                ? structuredClone(OSM_STYLE)
                : structuredClone(SATELLITE_STYLE);

        if (route.length > 1) {
            baseStyle.sources['route-source'] = {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: route,
                            },
                        },
                    ],
                },
            };

            baseStyle.layers.push(ROUTE_LAYER);
        }

        return baseStyle;
    }, [activeLayer, route]);
}
