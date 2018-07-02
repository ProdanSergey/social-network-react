import User         from '../models/user.model';
import PasswordGen  from './password';
import jwt          from 'jsonwebtoken';

// bcrypt import
const bcrypt = require('bcrypt');

// Secret
const secret = 'mSgmyIh3gX';

const verifyToken = token => {
    return jwt.verify(token, secret, function(err, decoded) {
        if(err) return err;
            return decoded;
    });
}


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
            const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: 86400 });
            newUser.save().then(item => {
                res.status(201).send({
                    registered: true,
                    token,
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
                    const token = jwt.sign({ id: user._id }, secret, { expiresIn: 86400 });
                    res.status(202).send({
                        authorized: true,
                        token,
                        message: 'User logged in successfully'
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

export const userInfo = (req, res) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, secret, function(err, decoded) {
        if(err) {
            res.status(401).send({
                auth: false, 
                message: 'No token provided'
            });
        }
        User.findById(decoded.id, function (err, user) {
            if (err) {
                res.status(500).send({
                    auth: false, 
                    message: 'Some problem'
                });
            }
            if(!user) {
                res.status(204).send({
                    auth: false, 
                    message: 'No user found'
                });
            } else {
                const { firstName, middleName, lastName, avatar } = user;
                res.status(202).send({
                    auth: true,
                    message: 'Authentication success',
                    firstName,
                    middleName,
                    lastName,
                    avatar : avatar ? avatar.slice(avatar.indexOf('\images')) : null
                });
            }
        });
    });
}

export const editUserInfo = (req, res) => {
    console.log(req.body)
    const token = req.headers['x-access-token'];
    const result = verifyToken(token);
    console.log(result)
    res.status(200).send({vrodedoshlo: 'ok'})
}