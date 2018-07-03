import jwt              from 'jsonwebtoken';
import User             from '../models/user.model';
import PasswordGen      from './password';
import { jwtsecret }    from '../constants/jwtsecret';

// bcrypt import
const bcrypt = require('bcrypt');

const mongooseQuery = (model, method, ...args) => {
    return model[method](...args)
}

export const registration = (req,res) => {
    const password = PasswordGen();
    const avatar = req.files.image ? req.files.image.file : '../client/public/images/no-avatar.jpg';
    const user = Object.assign({}, req.body, {password, avatar})
    const match = req.body.email;
    const newUser = new User(user);
    mongooseQuery(User, 'findOne', {email: match})
    .then(user => {
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
    .catch(error => {
        res.status(400).send(error)
    });
}

export const login = (req, res) => {
    const {email, password} = req.body
    mongooseQuery(User, 'findOne', {email})
    .then(user => {
        if (!user) {
            res.status(200).send({
                authorized: false,
                message: 'User doesnt exist',
            });
        } else {
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
        }        
    })
    // User.findOne(email, (err, user) => {
    //     if (user) {
    //         const hash = user.password;
    //         bcrypt.compare(password, hash, function(err, result) {
    //             if (result) {
    //                 const token = jwt.sign({ id: user._id }, jwtsecret, { expiresIn: 86400 });
    //                 res.status(200).send({
    //                     authorized: true,
    //                     token,
    //                     message: 'User logged in successfully'
    //                 });
    //             } else {
    //                 res.status(200).send({
    //                     authorized: false
    //                 });
    //             }
    //         });
    //     } else {
    //         res.status(200).send({
    //             authorized: false,
    //             message: 'User doesnt exist',
    //         });
    //     }        
    // })
}

export const userInfo = (req, res) => {
    const { body, method, tokenData: {id} } = req;
    const query = method === 'POST' ? 
        mongooseQuery(User, 'findById', id) : 
        mongooseQuery(User, 'findByIdAndUpdate', id, {$set: body}, {new: true})
    query.then(user => {
        if(!user) {
            res.status(200).send({
                authenticated: false, 
                message: 'Authentication failed'
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
    })
    .catch(error => {
        res.status(400).send(error)
    });
}