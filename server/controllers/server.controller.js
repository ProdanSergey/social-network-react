import mongoose from 'mongoose';

//import models
import User from '../models/user.model';

export const getUsers = (req,res) => {
    res.json({
        hello: 'hello',
        world: 'world'
    });
}

export const addUser = (req,res) => {
  const newUser = new User(req.body);
    newUser.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    console.log(newUser)
}
export const updateUser = (req,res) => {

}
export const getUser = (req,res) => {

}
export const deleteUser = (req,res) => {
 
}