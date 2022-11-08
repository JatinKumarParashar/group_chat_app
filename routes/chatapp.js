const express=require('express');
const chatAppController=require('../controllers/chatApp');
const authenticationMiddleware=require('../middleware/auth');

const router=express.Router();

router.post('/post-message?:groupId',authenticationMiddleware.authenticate,chatAppController.postMessage);
router.get('/get-message?:lastMessage',authenticationMiddleware.authenticate,chatAppController.getMessage);
router.get('/get-users?:groupId',authenticationMiddleware.authenticate,chatAppController.getUser);


module.exports=router;