export const createUserSlice = (set) => ({
    userName: null,
    client: null,
    setUserName: (userName) => set({ userName }),
    setClient: (client) => set({ client }),
    clearUserName: () => set({ userName: null }),
    clearClient: () => set({ client: null }),
});
