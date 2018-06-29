import User         from '../models/user.model';
import Session      from '../models/session.model';
import PasswordGen  from './password';
import jwt          from 'jsonwebtoken';

// bcrypt import
const bcrypt = require('bcrypt');

// Secret
const secret = 'mSgmyIh3gX';

export const registration = (req,res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(200).send({
            registered: false,
            message: 'Empty object'
        });
    }
    const password = PasswordGen();
    const avatar = Object.keys(req.files).length === 0 ? null : req.files.image.file;
    const user = Object.assign({}, req.body, {password, avatar})
    const match = req.body.email;
    const newUser = new User(user);
    User.findOne({email: match}, (err, user) => {
        if (user) {
            res.status(203).send({
                registered: false,
                message: 'Email entry duplicate'
            });
        } else {
            newUser.save().then(item => {
                res.status(201).send({
                    registered: true,
                    message: 'User is created successfuly',
                    password
                });
            }).catch(err => {
                res.status(400).send({
                    registered: false,
                    message: 'An error occur'
                });
            });
        }
    })  
}

export const login = (req, res) => {
    const password = req.body.password;
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            const hash = user.password;
            bcrypt.compare(password, hash, function(err, result) {
                if (result) {
                    Session.findOne({email: user.email}, (err, session) => {
                        if(!session) {
                            const token = jwt.sign({ secret }, secret);
                            const date = new Date();
                            const newSession = new Session({email: user.email, token, date});
                            newSession.save().then(item => {
                                res.status(202).send({
                                    authorized: true,
                                    message: 'User logged in successfully',
                                    date,
                                    token
                                });
                            })
                        } else {
                            res.status(200).send({
                                authorized: false,
                                message: 'User already logged in',
                            });
                        }
                    });
                } else {
                    res.status(205).send({
                        authorized: false
                    });
                }
            });
        } else {
            res.status(200).send({
                authorized: false,
                message: 'User doesnt exist',
            });
        }        
    })
}

export const logout = (req, res) => {
    Session.findOneAndRemove({token: req.body}, (err, session) => {
        if(err) {
            res.status(404).end();
        } 
        if(!session) {
            res.status(204).end();
        } else {
            res.status(200).end();
        }
    });
}

export const userInfo = (req, res) => {
    res.send(200).end()
    // Session.findOne({token: req.body}, (err, session) => {
    //     if(err) {
    //         res.status(404).end();
    //     }
    //     if(!session) {
    //         res.status(204).end();
    //     } else {
    //         User.findOne({email: session.email}, (err, user) => {
    //             const {avatar, firstName, middleName, lastName} = user;
    //             setTimeout(()=>{
    //                 res.status(200).send({avatar, firstName, middleName, lastName});
    //             }, 2000) // For demo purpose only!
    //         });
    //     }
    // });
}