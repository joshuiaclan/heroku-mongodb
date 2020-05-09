const router = require('express').Router();
let User = require('../../models/user.model');
const jwt = require('jsonwebtoken');

function login(req, res) {
    const userInfo = {
        username: req.body.username
    }
    User.find({username: userInfo.username})
        .then(users => {
            if(users.length > 0){
                jwt.sign({user: userInfo.username}, process.env.SECRET_KEY, {expiresIn: '1d'} ,(err, token) => {
                    res.json({
                        token
                    });
                });
            } else {
                res.send('User not yet registered');
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
};

module.exports = login;