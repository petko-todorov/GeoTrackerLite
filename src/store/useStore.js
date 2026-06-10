import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createMapSlice } from './slices/createMapSlice';

export const useStore = create(
    persist(
        (...a) => ({
            ...createMapSlice(...a),
        }),
        {
            name: 'app-geotrackerlite-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
