const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');






exports.postSignUp = (req, res, next) => {
    console.log('Routes is working well');
    const username = req.body.username;
    const email = req.body.email;
    const number = req.body.number
    const password = req.body.password;
    console.log('123', username, password, email, number);
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
                res.status(500).json(err);
                console.log('Or you have entered existing email');
            })
    })



}


function generateAccessToken(id) {
    return jwt.sign({
        user: id
    }, process.env.SCREATE_KEY_FOR_TOKEN);
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('controllers/user.js line 40', email, password);
    user.findAll({ where: { email: email } })
        .then(user => {
            console.log('user from controllers/user.js line 43', user[0].dataValues.password)
            bcrypt.compare(password, user[0].dataValues.password, (err, result) => {
                if (result == true) {
                    res.status(201).json({ result: user, token: generateAccessToken(user[0].dataValues.id) })

                }
                else{
                    res.status(401).json();

                }
            })
        }).catch(err=>{
            console.log(err);
            res.status(404).json();

        })

}
