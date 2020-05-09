const express = require('express');
const router = express.Router();
let User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './env/' });

const middleWare = {
    login : require('./login'),
    register : require('./register'),
    webTokenVerifier :  require('../../lib/webTokenVerifier')
};

router.get('/', middleWare.webTokenVerifier ,( req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if(err) { 
            res.sendStatus(403)
        }
        else {
            User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json(`Error: ${err}`));
        }
    });
});


router.get('/:id',(req, res) => {
    User.find({_id: req.params.id})
        .then( users => {
            if (users.length > 0) {
                res.json(users);
            }
            else {
                res.status(400).send(`No user with id: ${req.params.id}`);
            }    
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update/:id', (req,res) => {
    const userInfo = {
        username: req.body.username,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname
    }
    User.findByIdAndUpdate( req.params.id, { $set: userInfo },  { upsert: true} )
        .then( user => res.json(user))
        .catch( err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(users => {
            if(users.deletedCount > 0){
                res.send('User Deleted')
            }
            res.status(400).send(`No user with id: ${req.params.id}`);
        })
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.post('/login', middleWare.login);

router.post('/register', middleWare.register);

module.exports = router;