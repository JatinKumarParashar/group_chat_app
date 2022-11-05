const user = require('../models/user');
const bcrypt = require('bcrypt');




exports.postSignUp = (req, res, next) => {
    console.log('Routes is working well');
    const username = req.body.username;
    const email = req.body.email;
    const number=req.body.number
    const password = req.body.password;
    console.log('123', username, password, email,number);
     bcrypt.hash(password, 10, async (err, hash) => {
        user.create({
            username: username,
            email: email,
            number: number,
            password: hash
        }).then((data) => {
            res.status(201).json(data);
        })
            .catch(err => {
                console.log(err);
                console.log('Or you have entered existing email');
            })
    })
   


}