import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPlaygroundSlice } from '../slices';

export const usePlaygroundStore = create(
    persist(createPlaygroundSlice, {
        name: 'playground-store',
        partialize: (state) => ({
            sliderValue: state.sliderValue,
        }),
    })
);
