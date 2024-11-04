const sessionsByID = new Map();
const sessionsByCode = new Map();
const { v4: uuidv4 } = require('uuid');

const createSession = (users = []) => {
    const sessionID = uuidv4();
    const createdAt = new Date().toISOString();

    let sessionCode = uuidv4().substring(0, 4).toUpperCase();
    matchingCode = sessionsByCode.get(sessionCode);

    while (matchingCode) {
        matchingCode = sessionsByCode.get(sessionCode);
        sessionCode = uuidv4().substring(0, 4).toUpperCase();
    }

    const newSession = {
        sessionID,
        sessionCode,
        users,
        createdAt,
    };

    sessionsByID.set(sessionID, newSession);
    sessionsByCode.set(sessionCode, newSession);

    return newSession;
};

const getSessionbyID = (sessionID) => {
    return sessionsByID.get(sessionID) || null;
};

const getSessionbyCode = (sessionCode) => {
    return sessionsByCode.get(sessionCode) || null;
};

const deleteSession = (sessionID) => {
    const session = getSessionbyID(sessionID);
    // console.log(session.sessionCode);

    if (session) {
        sessionsByCode.delete(session.sessionCode);
        sessionsByID.delete(sessionID);
        return session;
    } else {
        return null;
    }
};

const addClienttoSession = (clientID, sessionID) => {
    console.log('Session Client combo: ', clientID, sessionID);
    const sessionbyID = sessionsByID.get(sessionID);

    sessionbyID.users.push(clientID);

    return sessionbyID;
};

module.exports = {
    createSession,
    getSessionbyID,
    getSessionbyCode,
    deleteSession,
    addClienttoSession,
};
