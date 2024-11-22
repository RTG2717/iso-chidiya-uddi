const sessionsByID = new Map();
const sessionsByCode = new Map();
const { v4: uuidv4 } = require('uuid');

const createSession = (users = []) => {
    const sessionID = uuidv4();
    const createdAt = new Date().toISOString();

    let sessionCode = uuidv4().substring(0, 4).toUpperCase();

    while (sessionsByCode.get(sessionCode)) {
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

const getSessionUsersbyID = (sessionID) => {
    return sessionsByID.get(sessionID)?.users || null;
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
    const session = sessionsByID.get(sessionID);
    if (!session) {
        throw 'Session not found';
    }

    session.users.push(clientID);

    return session;
};

const removeClientfromSession = (clientID, sessionID) => {
    const session = sessionsByID.get(sessionID);
    if (!session) {
        throw 'Session not found';
    }

    session.users = session.users.filter((user) => user !== clientID);

    return session;
};

module.exports = {
    createSession,
    getSessionbyID,
    getSessionbyCode,
    deleteSession,
    addClienttoSession,
    getSessionUsersbyID,
};
