import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAPISlice } from '../slices';

export const useAPIStore = create(
    persist(createAPISlice, {
        name: 'api-store',
        partialize: (state) => ({
            apiURL: state.apiURL,
            wsURL: state.wsURL,
        }),
    })
);
