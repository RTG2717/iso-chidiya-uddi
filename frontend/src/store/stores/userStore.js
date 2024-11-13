import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createUserSlice } from '../slices';

export const useUserStore = create(
    persist(createUserSlice, {
        name: 'user-store',
        partialize: (state) => ({
            userName: state.userName,
            client: state.client,
        }),
    })
);
