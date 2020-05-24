// Importing Modules

const jwt = require('jsonwebtoken');

// Functions

const validateSessions = async (sessions) => {
    const validSessions = [];

    for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        //Verify Session
        try {
            jwt.verify(session, process.env.SECRET);
            if (!validSessions.includes(session))
                validSessions.push(session);
        } catch (err) {

        }
    }

    return validSessions;

};

//Filter Invalid Session
const removeSession = async (user, sessions, webToken) => {
    sessions = await validateSessions(sessions);
    for (let i = 0; i <sessions.length; i++) {
        if (sessions[i]== webToken)
        sessions.splice(i, 1);
    }
    await user.update({sessions});
};

//Clear Session Array from User in Database
const removeSessions = async (user, sessions, webToken) => {
    await user.update({sessions: []});
};

//Update Session Array from User in Database
const addSession = async (user, sessions, webToken) => {
    sessions.push(webToken);
    sessions = await validateSessions(sessions);

    await user.update({sessions});
};

// Exports

module.exports.removeSession = removeSession;
module.exports.removeSessions = removeSessions;
module.exports.addSession = addSession;
module.exports.validateSessions = validateSessions;