import mongoose from 'mongoose';

//import models
import User from '../models/user.model';

export const getUsers = (req,res) => {
    res.json([{
        hello: 'hello',
        world: 'world'
    }]);
}

export const addUser = (req,res) => {
    if (Object.keys(req.body).length == 0) {
        console.log('пуст');
    }
    console.log(req.body)
    const newUser = new User(req.body);
    newUser.save()
        .then(item => {
            res.status(200).send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
}

export const updateUser = (req,res) => {

}

export const getUser = (req,res) => {

}

export const deleteUser = (req,res) => {

}