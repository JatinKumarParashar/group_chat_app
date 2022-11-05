const express = require('express');
const router = express.Router();
const userController=require('../controllers/user');

router.post('/add-user',userController.postSignUp);
//router.post('/login',userController.postLogin);

module.exports=router;
