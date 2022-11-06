const Message=require('../models/message');

exports.postMessage=(req,res,next)=>{
    const message=req.body.message;
    const userId=req.user.dataValues.id;
    const username= req.user.dataValues.username;
    //console.log(' controllers/chatApp.js postMessage line 6',message,userId)
    Message.create({
        message:message,
        userId:userId,
        username:username
    }).then(response=>{
        res.status(201).json(response);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })

}


exports.getMessage=(req,res,next)=>{
    Message.findAll()
    .then(result=>{
        console.log('controllers/chatApp/getMessage line 25',result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })

}