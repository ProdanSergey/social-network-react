import User             from '../models/user.model';
import PasswordGen      from './password';
import jwt              from 'jsonwebtoken';
import { jwtsecret }    from '../constants/jwtsecret';

// bcrypt import
const bcrypt = require('bcrypt');

export const registration = (req,res) => {
    const password = PasswordGen();
    const avatar = req.files.image ? req.files.image.file : '../client/public/images/no-avatar.jpg';
    const user = Object.assign({}, req.body, {password, avatar})
    const match = req.body.email;
    const newUser = new User(user);
    User.findOne({email: match}, (err, user) => {
        if (user) {
            res.status(200).send({
                authorized: false,
                message: 'Email entry duplicate'
            });
        } else {
            const token = jwt.sign({ id: newUser._id }, jwtsecret, { expiresIn: 86400 });
            newUser.save().then(item => {
                res.status(200).send({
                    authorized: true,
                    token,
                    message: 'User is created successfuly',
                    password
                });
            })
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
                    const token = jwt.sign({ id: user._id }, jwtsecret, { expiresIn: 86400 });
                    res.status(200).send({
                        authorized: true,
                        token,
                        message: 'User logged in successfully'
                    });
                } else {
                    res.status(200).send({
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
    const { id } = req.tokenData;
    User.findById(id, function (err, user) {
        if (err) {
            res.status(500).send({
                authenticated: false, 
                message: 'Some problem'
            });
        }
        if(!user) {
            res.status(200).send({
                authenticated: false, 
                message: 'No user found'
            });
        } else {
            const { firstName, middleName, lastName, avatar } = user;
            res.status(200).send({
                authenticated: true,
                message: 'Authentication success',
                firstName,
                middleName,
                lastName,
                avatar : avatar ? avatar.slice(avatar.indexOf('\\images')) : null
            });
        }
    });
}

export const editUserInfo = (req, res) => {
    const { id } = req.tokenData;
    const key = Object.keys(req.body)
    User.findByIdAndUpdate(id, {$set: {[key[0]]: req.body[key]}}, function (err, user) {
        if (err) {
            res.status(500).send({
                authenticated: false, 
                message: 'Some problem'
            });
        }
        if(!user) {
            res.status(200).send({
                authenticated: false, 
                message: 'No user found'
            });
        } else {
            const { firstName, middleName, lastName, avatar } = user;
            res.status(200).send({
                authenticated: true,
                message: 'Authentication success',
                firstName,
                middleName,
                lastName,
                avatar : avatar ? avatar.slice(avatar.indexOf('\\images')) : null
            });
        }
    });
}