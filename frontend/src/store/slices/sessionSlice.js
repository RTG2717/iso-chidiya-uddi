export const createSessionSlice = (set) => ({
    session: null,
    sessionCode: null,
    setSession: (session) => set({ session }),
    setSessionCode: (sessionCode) => set({ sessionCode }),
    clearSession: () => set({ session: null }),
    clearSessionCode: () => set({ sessionCode: null }),
});
