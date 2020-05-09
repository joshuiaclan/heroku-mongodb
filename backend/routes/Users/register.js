const router = require('express').Router();
let User = require('../../models/user.model');

function register (req,res) {
    const userInfo = {
        username: req.body.username,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname
    }
    const newUser = new User(userInfo);
    newUser.save()
        .then( () => res.send('User added!'))
        .catch( err => res.status(400).json(`Error: ${err}`));
};

module.exports = register;