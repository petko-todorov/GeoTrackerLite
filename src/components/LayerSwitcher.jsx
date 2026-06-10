import { useStore } from '../store/useStore';

export default function LayerSwitcher() {
    const activeLayer = useStore((state) => state.activeLayer);
    const setActiveLayer = useStore((state) => state.setActiveLayer);

    return (
        <div className="absolute top-4 right-4 z-1000 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-1.5 flex gap-1 border border-gray-100">
            <button
                onClick={() => setActiveLayer('osm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    activeLayer === 'osm'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                Map
            </button>
            <button
                onClick={() => setActiveLayer('satellite')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    activeLayer === 'satellite'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                Satellite
            </button>
        </div>
    );
}
