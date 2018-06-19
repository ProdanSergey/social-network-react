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
    Object.keys(req.body).length === 0 ? console.log('пуст') : console.log(req.body)
    const match = req.body.email;
    const newUser = new User(req.body);
    User.find({email: match}, (err, users) => {
        if (users.length) {
            res.statusMessage = "Email entry duplicate!!!";
            res.status(200).send();
        } else {
            newUser.save()
            .then(item => {
                res.status(200).send("item saved to database");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
        }
    })  
}

export const updateUser = (req,res) => {

}

export const getUser = (req,res) => {

}

export const deleteUser = (req,res) => {

}

export const uploadUserImage = (req, res) => {
    console.log(req.body);
    // let imageFile = req.files.file;
    // imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    // if (err) {
    //   return res.status(500).send(err);
    // }
    // res.json({file: `public/${req.body.filename}.jpg`});
    // });
}