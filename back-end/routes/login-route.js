// Importing Modules

const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../model/user.model');
const messages = require('../messages/messages');
const { loginValidation } = require('../model/user.validation');
const { addSession } = require('../function/session-handler');

// Route

Router.post('/', async (req, res) => {
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});

    const user = await userModel.findOne({ email: req.body.email});
    if (!user) return res.status(400).send({message: messages.NO_MAIL_FOUND});

    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) return res.status(400).send({message: messages.PASSWORD_INCORRECT})

    // Generate JWT
    const webToken = jwt.sign({_id: user._id}, "SECRET KEY", { expiresIn: "15d"});

    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 15);

    res.cookie('auth-token', webToken, {
        expires: expireDate,
        secure: false,
        httpOnly: false,
    }).send({user});

    await addSession(user, user.sessions, webToken)
});

// Export

module.exports = Router;