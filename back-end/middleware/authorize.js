// Importing Modules

const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
const messages = require('../messages/messages');

// Export

module.exports = async (req, res, next) => {
    const webToken = req.cookies['auth-token'];
    if (!webToken) return res.status(401).send({message: messages.ACCESS_DENIED});
    
    try {
        const verified = jwt.verify(webToken, process.env.SECRET);
        const user = await userModel.findById(verified._id);

        if (!user.sessions.includes(webToken))
        return res.clearCookie('auth-token').status(400).send({message: messages.OLD_SESSION_LOGIN});

        req.user = verified;

        next();
} catch (err) {
    res.clearCookie('auth-token').status(400).send({message: messages.INVALID_TOKEN});
}

}