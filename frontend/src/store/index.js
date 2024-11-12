import { create } from 'zustand';
import { createSessionSlice } from './slices/sessionSlice';
import { createAPISlice } from './slices/apiSlice';

const useStore = create((set) => ({
    ...createSessionSlice(set),
    ...createAPISlice(set),
}));

export default useStore;
