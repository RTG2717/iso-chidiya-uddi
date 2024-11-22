export const createAPISlice = (set) => ({
    apiURL: import.meta.env.VITE_API_URL || null,
    wsURL: import.meta.env.VITE_WS_URL || null,
    setapiURL: (url) => set({ apiURL: url }),
});
