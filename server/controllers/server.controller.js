import jwt                   from 'jsonwebtoken';
import User                  from '../models/user.model';
import PasswordGen           from '../assets/password';
import { jwtsecret }         from '../constants/jwtsecret';
import {
    EMAIL_DUPLICATE,
    USER_CREATE_SUCCESS,
    USER_DOES_NOT_EXIST,
    USER_LOGIN_SUCCESS,
    AUTHENTICATION_FAILED,
    AUTHENTICATION_SUCCESS
} from '../constants/responseMessages';

// bcrypt import
const bcrypt = require('bcrypt');

const mongooseQuery = (model, method, ...args) => {
    return model[method](...args)
}

export const registration = (req,res) => {
    const { body, body: {email}, files: {image} } = req;
    const password = PasswordGen();
    const avatar = image ? image.file : '..\\client\\public\\images\\no-avatar.jpg';
    const user = Object.assign({}, body, {password, avatar})
    const newUser = new User(user);
    mongooseQuery(User, 'findOne', {email})
    .then(user => {
        if (user) {
            res.status(200).send({
                authorized: false,
                message: EMAIL_DUPLICATE
            });
        } else {
            const token = jwt.sign({ id: newUser._id }, jwtsecret, { expiresIn: 86400 });
            newUser.save().then(item => {
                res.status(200).send({
                    authorized: true,
                    token,
                    message: USER_CREATE_SUCCESS,
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
                message: USER_DOES_NOT_EXIST,
            });
        } else {
            const hash = user.password;
            bcrypt.compare(password, hash, function(err, result) {
                if (result) {
                    const token = jwt.sign({ id: user._id }, jwtsecret, { expiresIn: 86400 });
                    res.status(200).send({
                        authorized: true,
                        token,
                        message: USER_LOGIN_SUCCESS
                    });
                } else {
                    res.status(200).send({
                        authorized: false
                    });
                }
            });
        }        
    })
    .catch(error => {
        res.status(400).send(error)
    });
}

export const userInfo = (req, res) => {
    const { body, method, tokenData: {id}, files: {image} } = req;
    const queryData = image ? {avatar: image.file} : body
    const query = method === 'POST' ? 
        mongooseQuery(User, 'findById', id) : 
        mongooseQuery(User, 'findByIdAndUpdate', id, {$set: queryData}, {new: true})
    query.then(user => {
        if(!user) {
            res.status(200).send({
                authenticated: false, 
                message: AUTHENTICATION_FAILED
            });
        } else {
            const { firstName, middleName, lastName, avatar } = user;
            res.status(200).send({
                authenticated: true,
                message: AUTHENTICATION_SUCCESS,
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