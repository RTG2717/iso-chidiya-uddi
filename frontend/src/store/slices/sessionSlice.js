export const createSessionSlice = (set) => ({
    session: null,
    setSession: (session) => set({ session }),
    clearSession: () => set({ session: null }),
});
