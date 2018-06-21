//import models
import User from '../models/user.model';

//import controllers
import PasswordGen from './password';

//import validators
// import { validateEmail } from '../controllers/user-validation';

// bcrypt import
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

export const addUser = (req,res) => {
    if (Object.keys(req.body).length === 0) {
        res.statusMessage = "Empty object";
        res.status(200).send();
    }
    console.log(req.body)
    const password = PasswordGen();
    const user = Object.assign({}, req.body, {password})
    const match = req.body.email;
    const newUser = new User(user);
    User.find({email: match}, (err, users) => {
        if (users.length) {
            res.statusMessage = 'Email entry duplicate!!!';
            res.status(200).send();
        } else {
            newUser.save()
            .then(item => {
                res.statusMessage = 'User is created successfuly';
                res.status(200).send({password});
            })
            .catch(err => {
                res.status(400).send();
            });
        }
    })  
}

export const getUser = (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    User.find({email: req.body.email}, (err, user) => {
        if (user.length) {
            user = user[0];
            const hash = user.password;
            bcrypt.compare(password, hash, function(err, result) {
                if (result) {
                    res.statusMessage = 'OK'
                    res.status(200).send(user);
                } else {
                    res.statusMessage = 'User find, but wrong password!'
                    res.status(200).send();
                }
            });
        } else {
            res.statusMessage = 'User doesnt exist.'
            res.status(200).send();
        }        
    })
}