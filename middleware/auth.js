const jwt=require('jsonwebtoken');
const user=require('../models/user');

exports.authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    //console.log(token);
    const userid=jwt.verify(token,process.env.SCREATE_KEY_FOR_TOKEN);
    //console.log('userid >>>>>> ',userid.user);
    user.findByPk(userid.user).then(user=>{
       // console.log('user in auth',user);
        req.user=user;
       // console.log('req.user >>>>>>>>>',req.user);
        next();
    }).catch(err=>{
        console.log(err);
    })
}