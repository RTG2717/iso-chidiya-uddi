import { create } from 'zustand';
import { createSessionSlice } from './slices/sessionSlice';
import { createAPISlice } from './slices/apiSlice';
import { createUserSlice } from './slices/userSlice';

const useStore = create((set) => ({
    ...createSessionSlice(set),
    ...createAPISlice(set),
    ...createUserSlice(set),
}));

export default useStore;
