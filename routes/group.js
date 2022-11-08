const express = require('express');
const router = express.Router();
const groupController=require('../controllers/group');
const authenticationMiddleware=require('../middleware/auth');

router.post('/createGroup',authenticationMiddleware.authenticate,groupController.createGroup);
router.get('/getGroups',authenticationMiddleware.authenticate,groupController.getGroups);
router.post('/add-user?:groupId',authenticationMiddleware.authenticate,groupController.addUser);
router.get('/getAllUsers',authenticationMiddleware.authenticate,groupController.getAllUsers);
router.post('/removeUser?:userId',authenticationMiddleware.authenticate,groupController.removeUser);
router.post('/makeUserAdmin?:userId',authenticationMiddleware.authenticate,groupController.makeAdmin);

module.exports=router;
