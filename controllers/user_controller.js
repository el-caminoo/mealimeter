const User = require('../models/user');
require('dotenv').config;
const jwt = require('jsonwebtoken');

exports.create_user = function (req, res) {
    let person = {}
    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    });
    // only the password is checked because no two emails can be the same
    var password2 = req.body.password2;
    if (user.password === password2) {
        user.save();
        const payload = {name: user.email}
        const options = {expiresIn: '2d', issuer: 'https//example.com'}
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(payload, secret, options)
        person.token = token;
        person.result = user;
        res.json({
            status: "success",
            data: person
        })
    }
    else {
        res.json({
            status: "error"
        })
    }
   
}



exports.login = function (req, res) {
    result = {}
    const {email, password} = req.body;
    User.findOne({email, password}, 'first_name last_name email', (err, user) => {
        if (!err && user){ // if a user matching the email and password is found, a token is assigned
            const payload = {name: user.email}
            const options = {expiresIn: '1d', issuer: 'https//example.com'}
            const secret = process.env.JWT_SECRET
            const token = jwt.sign(payload, secret, options)
            result.token = token;
            result.result = user;
            res.status(200).json({
                status: 'success',
                data: result
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





