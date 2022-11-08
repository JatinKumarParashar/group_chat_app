const Message=require('../models/message');
const User=require('../models/user');
const UserGroup=require('../models/userGroup');
const { Op } = require("sequelize");
exports.postMessage=(req,res,next)=>{
    const message=req.body.message;
    const userId=req.user.dataValues.id;
    const username= req.user.dataValues.username;
    const groupId=req.query.groupId
    //console.log(' controllers/chatApp.js postMessage line 6',message,userId)
    Message.create({
        message:message,
        userId:userId,
        username:username,
        groupId:groupId
    }).then(response=>{
        res.status(201).json(response);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })

}


exports.getMessage=(req,res,next)=>{
    const lastMessage=req.query.lastMessage;
    const groupId=req.query.groupId;
    Message.findAll({where:{id:{[Op.gt]:lastMessage},groupId:groupId}})
    .then(result=>{
       // console.log('controllers/chatApp/getMessage line 30 ',result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })

}

exports.getUser=(req,res,next)=>{
   const groupId=req.query.groupId;
   UserGroup.findAll({
    where: {
      [Op.and]: [
        { userId: req.user.dataValues.id },
        { groupId: groupId }
      ]
    }
  })
  .then(result=>{
    //console.log('controllers/chatApp/getUser line 52',result[0].dataValues);
    res.status(200).json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
}