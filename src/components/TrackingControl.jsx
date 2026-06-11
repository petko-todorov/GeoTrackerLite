import { useStore } from '../store/useStore';

export default function TrackingControl() {
    const isTracking = useStore((state) => state.isTracking);
    const setIsTracking = useStore((state) => state.setIsTracking);

    const handleToggleTracking = () => {
        setIsTracking(!isTracking);
    };

    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <button
                onClick={handleToggleTracking}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border-2 ${
                    isTracking
                        ? 'bg-red-500 border-red-400 text-white'
                        : 'bg-blue-600 border-blue-500 text-white'
                }`}
            >
                {isTracking ? (
                    <>
                        <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                            fill="currentColor"
                        >
                            <rect x="6" y="6" width="12" height="12" rx="2" />
                        </svg>
                        <span className="font-bold tracking-wide uppercase">
                            Stop Tracking
                        </span>
                    </>
                ) : (
                    <>
                        <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                            fill="currentColor"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="font-bold tracking-wide uppercase">
                            Start Tracking
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}
