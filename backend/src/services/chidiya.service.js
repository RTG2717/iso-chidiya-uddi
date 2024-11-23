const allSessionChidiyas = new Map();

const initChidyas = (sessionID) => {
    // must be called when creating a new session
    allSessionChidiyas.set(sessionID, new Map());
};

const addChidiya = (sessionID, userID, chidiyaName, chidiyaAns) => {
    const chidiyas = allSessionChidiyas.get(sessionID);
    if (!chidiyas) {
        throw new Error('Session not found');
    }

    chidiyas.set(chidiyaName, { ans: chidiyaAns, fromUser: userID });
};

const pickRandomChidiya = (sessionID) => {
    // TODO: Implement this function to pick a random chidiya from the session
    const chidiyas = allSessionChidiyas.get(sessionID);
    if (!chidiyas) {
        throw new Error('Session not found');
    }
    return 'placeholder chidiya name';
};

const clearChidiyas = (sessionID) => {
    if (!allSessionChidiyas.has(sessionID))
        throw new Error('Session not found');
    allSessionChidiyas.set(sessionID, new Map());
};

module.exports = {
    initChidyas,
    addChidiya,
    pickRandomChidiya,
    clearChidiyas,
};
