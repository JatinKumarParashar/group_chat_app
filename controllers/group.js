const group = require('../models/group');
const Group = require('../models/group');
const Message = require('../models/message');
const User = require('../models/user');
const UserGroup = require('../models/userGroup');
const { Op } = require("sequelize");



exports.createGroup = (req, res, next) => {
    const groupName = req.body.groupName;
    console.log('controllers/groups/creategroup line 9', groupName);
    if (groupName) {
        Group.create({
            groupName: groupName
        })
            .then(group => {
                UserGroup.create({
                    isAdmin:true,
                    userId: req.user.dataValues.id,
                    groupId: group.id
                })
                    .then(result => {
                        res.status(201).json(result);
                    })
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
}


exports.getGroups = async (req, res, next) => {
    const userId = req.user.dataValues.id;
    const groupsOfUser = [];
    //console.log('controllers.group.js/getGroups line 32',userId);
   await UserGroup.findAll({ where: { userId: userId } })
        .then(async groups => {
            //console.log('controllers/group,js/getgroups line 36', groups[0].dataValues.groupId);
            for (let i = 0; i < groups.length; i++) {

               await Group.findAll({ where: { id: groups[i].dataValues.groupId } })
                    .then(group => {
                        //console.log('controllers/groups.js/getGroups line 40', group[0].dataValues);
                        groupsOfUser.push(group[0].dataValues);
                        //console.log('controllers/groups.js/getGroups line 44',groupsOfUser);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

            //console.log('controllers/groups/getGroups line 50',groupsOfUser);
           res.status(200).json(groupsOfUser);
        })
        .catch(err=>{
            console.log(err);
        })

}


exports.addUser=(req,res,next)=>{
    const username=req.body.username;
    const groupId=req.query.groupId;
   // console.log('controllers/groups.js/add-user line 64',username);
    User.findAll({where:{username:username}})
    .then(user=>{
       // console.log('line67',user[0].dataValues.id);
       Group.findAll({where:{id:groupId}})
       .then(group=>{
           console.log('controllers/groups.js/add-user line 71',group[0].dataValues.id);
           UserGroup.create({
            isAdmin:false,
            userId:user[0].dataValues.id,
            groupId:group[0].dataValues.id
        })
        .then(result=>{
            res.status(201).json(result);
        })

       })
       .catch(err=>{
        res.status(501).json(err);
       })


    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

exports.getAllUsers=(req,res,next)=>{
    const groupId=req.query.groupId;
    const users=[];
    UserGroup.findAll({where:{groupId:groupId}})
    .then(async groups=>{
       // console.log('controllers/groups.getAllUsers line 97',groups[0].dataValues.userId);
        for(let i=0;i<groups.length;i++){
          await  User.findAll({where:{id:groups[i].dataValues.userId}})
            .then(user=>{
               // console.log('controllers/groups/getAllUsers line 102',user[0].dataValues)
                users.push(user[0].dataValues);
            })


        }
        //console.log('controllers/groups/getAllUsers line 107',users);
        res.status(200).json({users:users,groups:groups});
    })
    .catch(err=>{
        res.status(500).json(err);
    })
}

exports.removeUser=(req,res,next)=>{
    const userId=req.query.userId;
    const groupId=req.query.groupId;
    UserGroup.destroy({
  where: {
    [Op.and]: [
      { userId: userId },
      { groupId: groupId }
    ]
  }
})
.then(result=>{
    res.status(201).json(result)
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
})
}


exports.makeAdmin=(req,res,next)=>{
    const userId=req.query.userId;
    const groupId=req.query.groupId;
    const isAdmin=req.body.isAdmin;
    UserGroup.update({isAdmin:isAdmin},{
        where: {
          [Op.and]: [
            { userId: userId },
            { groupId: groupId }
          ]
        }
      })
      .then(resule=>{
        res.status(200).json(resule);
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json(err);
      })
}