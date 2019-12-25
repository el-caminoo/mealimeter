const User = require('../models/user');
require('dotenv').config;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.create_user = function (req, res) {
    let person = {}
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    });
    user.save((err) => {
        if (err){res.status(500).json({
            status: "error creating user",
            data: err
        })}
        const options = {expiresIn: '1d', issuer: 'https//example.com'}
        const token = jwt.sign({name:user},process.env.JWT_SECRET, options) // token will be valid for 24 hours
        person.APIKey = token;
        person.result = user
        res.status(201).json({
            status: "successfully created user",
            data: person
        })
    });
}



exports.login = function (req, res) {
    result = {}
    const email = req.body.email;
    User.findOne({email: email}, 'first_name last_name email password', (err, user) => {
        if (!err && user){ // if a user matching the email and password is found, a token is assigned
            bcrypt.compare(req.body.password, user.password, (err, result) =>{
                if (result == true){
                    const options = {expiresIn: '2h', issuer: 'https//example.com'}
                    const token = jwt.sign({name:user._id},process.env.JWT_SECRET, options) // token will be valid for 2 hours
                    res.status(200).json({
                    status: "logged in",
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    token: token
                })}
                else(res.send("check password"))
            })
        }
        else {
            res.status(404).json({
                status: 'error',
                data: err
            })
        }
    })
}





