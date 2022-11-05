const Message=require('../models/message');

exports.postMessage=(req,res,next)=>{
    const message=req.body.message;
    const userId=req.user.dataValues.id;
    //console.log(' controllers/chatApp.js postMessage line 6',message,userId)
    Message.create({
        message:message,
        userId:userId
    }).then(response=>{
        res.status(201).json(response);
    }).catch(err=>{
        consple.log(err);
        res.status(500).json(err);
    })

}