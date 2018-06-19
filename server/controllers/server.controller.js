//import models
import User from '../models/user.model';

//import controllers
import PasswordGen from './password';

export const getUsers = (req,res) => {
    res.json([{
        hello: 'hello',
        world: 'world'
    }]);
}

export const addUser = (req,res) => {
    req.body = {};
    if (Object.keys(req.body).length === 0) {
        res.statusMessage = "Empty object";
        res.status(200).send();
    } else {
        res.statusMessage = "It's ok!";
        res.status(200).send();
    }
    const password = PasswordGen();
    const user = Object.assign({}, req.body, {password})
    const match = req.body.email;
    const newUser = new User(user);
    User.find({email: match}, (err, users) => {
        if (users.length) {
            res.statusMessage = "Email entry duplicate!!!";
            res.status(200).send();
        } else {
            newUser.save()
            .then(item => {
                res.statusMessage = `User is created successfuly. The password is ${password}`;
                res.status(200).send();
            })
            .catch(err => {
                res.status(400).send();
            });
        }
    })  
}