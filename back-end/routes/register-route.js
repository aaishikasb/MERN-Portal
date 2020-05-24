// Importing Modules

const Router = require('express').Router();
const bcrypt = require('bcryptjs');

const userModel = require('../model/user.model');
const messages = require('../messages/messages');
const { registerValidation } = require('../model/user.validation');

// Route

Router.post('/', async (req, res) => {
    const { error } = registerValidation.validate(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});

    const emailExists = await userModel.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send({message: messages.REGISTER_MAIL_EXISTS});

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    //new database user model
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash
    });

    try {
        await user.save();
        res.send({
            user: user._id
        });
    } catch (err) {
        res.status(400).send({err});
    }
});

// Export

module.exports = Router;