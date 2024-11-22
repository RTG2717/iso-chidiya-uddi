import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSessionSlice } from '../slices';

export const useSessionStore = create(
    persist(createSessionSlice, {
        name: 'session-store',
        partialize: (state) => ({
            session: state.session,
            sessionCode: state.sessionCode,
        }),
    })
);
