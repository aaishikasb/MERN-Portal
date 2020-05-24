// Importing Modules

const Router = require('express').Router();
const authorize = require('../middleware/authorize');
const userModel = require('../model/user.model');

// Route

Router.post('/', authorize, async (req, res) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).send({ user: {name: user.name}});
});

// Export

module.exports= Router;