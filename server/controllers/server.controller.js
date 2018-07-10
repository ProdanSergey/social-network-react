import jwt                   from 'jsonwebtoken';
import User                  from '../models/user.model';
import PasswordGen           from '../assets/password';
import avatarSlicer          from '../assets/avatar';
import { jwtsecret }         from '../constants/jwtsecret';
import * as messages         from '../constants/responseMessages';
import { DEFAULT_AVATAR }    from '../constants/defaultAvatar';

// bcrypt import
const bcrypt = require('bcrypt');

export const registration = (req,res) => {
    const { filesIsEmpty} = res.errors
    const { body, body: {email}, files } = req;
    const password = PasswordGen();
    const avatar = filesIsEmpty ? DEFAULT_AVATAR : avatarSlicer(files.image.file)
    const user = Object.assign({}, body, {password, avatar})
    const newUser = new User(user);
    User.findOne({email})
    .then(user => {
        if (user) {
            res.status(200).send({
                response: {
                    registered: false,
                    alert: true,
                    message: messages.EMAIL_DUPLICATE
                }
            });
        } else {
            const token = jwt.sign({ id: newUser._id }, jwtsecret, { expiresIn: 86400 });
            newUser.save().then(item => {
                res.status(200).send({
                    response: {
                        registered: true,
                        alert: true,
                        message: messages.USER_CREATE_SUCCESS,
                        password
                    },
                    token,
                });
            })
        }
    })
    .catch(error => res.status(400).send(error));
}

export const login = (req, res) => {
    const {email, password} = req.body
    User.findOne({email})
    .then(user => {
        if (!user) {
            res.status(200).send({
                response: {
                    authorized: false,
                    alert: true,
                    message: messages.USER_DOES_NOT_EXIST,
                }
            });
        } else {
            const hash = user.password;
            bcrypt.compare(password, hash, function(err, result) {
                if (result) {
                    const token = jwt.sign({ id: user._id }, jwtsecret, { expiresIn: 86400 });
                    res.status(200).send({
                        response: {
                            authorized: true,
                            alert: false,
                            message: messages.USER_LOGIN_SUCCESS
                        },
                        token
                    });
                } else {
                    res.status(200).send({
                        response: {
                            authorized: false,
                            alert: true,
                            message: messages.AUTHORIZATION_FAILED
                        }
                    });
                }
            });
        }        
    })
    .catch(error => res.status(400).send(error));
}

export const userInfo = (req, res) => {
    const { filesIsEmpty} = res.errors;
    const { body, files, method, tokenData: {id} } = req;
    const queryData = filesIsEmpty ? body : {avatar: avatarSlicer(files.image.file)};
    const query = method === 'GET' ? 
        User.findById(id) : 
        User.findByIdAndUpdate(id, {$set: queryData}, {new: true})
    query.then(user => {
        if(!user) {
            res.status(200).send({
                response: {
                    authenticated: false,
                    alert: true,
                    message: messages.AUTHENTICATION_FAILED
                }
            });
        } else {
            const { firstName, middleName, lastName, avatar, friends } = user;
            res.status(200).send({
                response: {
                    authenticated: true,
                    message: messages.AUTHENTICATION_SUCCESS
                },
                user: {
                    firstName,
                    middleName,
                    lastName,
                    avatar,
                    friends
                }
            });
        }
    })
    .catch(error => res.status(400).send(error));
}

export const search = (req, res) => {
    const { search } = req.body;
    User.find({$or:[{firstName: search},{lastName: search}]})
    .then(users => {
        if(!users.length) {
            res.status(200).send({
                alert: true,
                message: messages.SEARCH_RESPONSE_EMPTY
            });
        } else {
            const userFilter = users.map(user => {
                const { _id , firstName, gender, lastName, avatar, age } = user;
                return { _id, firstName, gender, lastName, avatar, age }
            })
            res.status(200).send({users: userFilter})
        }
    })
    .catch(error => res.status(400).send(error));
}

export const addOrRemoveFriend = (req, res) => {
    const { method, body: {friend}, tokenData: {id} } = req;
    console.log(method)
    const query = method === 'PUT' ? 
        {$push: {'friends': friend}} : 
        {$pull: {'friends': friend}}
    User.findByIdAndUpdate(id, query, {new: true}) 
    .then(user => {
        if(!user) {
            res.status(200).send({
                response: {
                    authenticated: false,
                    alert: true,
                    message: messages.AUTHENTICATION_FAILED
                }
            });
        } else {
            const { firstName, middleName, lastName, avatar, friends } = user;
            res.status(200).send({
                response: {
                    authenticated: true,
                    alert: false,
                    message: messages.AUTHENTICATION_SUCCESS
                },
                user: {
                    firstName,
                    middleName,
                    lastName,
                    avatar,
                    friends
                }
            });
        }
    })
    .catch(error => res.status(400).send(error));
}

export const getFriends = (req, res) => {
    const { tokenData: {id} } = req;
    User.findById(id) 
    .then(user => {
        if(!user) {
            res.status(200).send({
                message: messages.AUTHENTICATION_FAILED
            });
        } else {
            User.find({'_id': { $in: user.friends}})
                .then(users => {
                    return users.map(user => {
                        const { _id, firstName, middleName, lastName, avatar, age, gender } = user;
                        return { _id, firstName, middleName, lastName, avatar, age, gender }
                    })
                })
                .then(result => res.status(200).send(result))
        }
    })
    .catch(error => res.status(400).send(error));
}