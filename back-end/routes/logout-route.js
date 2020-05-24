// Importing Modules

const Router = require('express').Router();
const jwt = require('jsonwebtoken');

const userModel = require('../model/user.model');
const messages = require('../messages/messages');
const { removeSession,
        removeSessions } = require('../function/session-handler');

// Function

const logout = async (req, res, everywhere = false ) => {
    const webToken = req.cookies['auth-token'];
    if (!webToken) return res.status(401).send({message: messages.LOGOUT_WITHOUT_TOKEN});

    try {
        const _id = jwt.verify(webToken, process.env.SECRET)._id;

        const user = await userModel.findById(_id);
        const sessions = user.sessions;

        (everywhere ? await removeSessions(user) : await removeSession(user, sessions, webToken));

        res.clearCookie('auth-token').send({});
    } catch(err) {
        res.clearCookie('auth-token').status(400).send({message: messages.INVALID_TOKEN});
    }
}

// Routes
Router.post('/', async (req, res) => await logout(req, res));
Router.post('/everywhere', async (req, res) => await logout (req, res, true));

// Export
module.exports = Router;
