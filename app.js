const express=require('express');
const bodyParsed=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');


dotenv.config();
app=express();
app.use(cors());

//database
const sequelize = require('./util/database');

//models
const User=require('./models/user');
const Message=require('./models/message');
const Group=require('./models/group');
const UserGroup=require('./models/userGroup');


//body-paraser
app.use(bodyParsed.json());
app.use(bodyParsed.urlencoded({ extended: true }));


//routes
const userRoutes=require('./routes/user');
const chatAppRoutes=require('./routes/chatapp');
const grouproutes=require('./routes/group');

app.use('/user',userRoutes);
app.use('/chatApp',chatAppRoutes);
app.use('/group',grouproutes);

//Relation between tables
User.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Group);

User.belongsToMany(Group,{through:UserGroup});
Group.belongsToMany(User,{through:UserGroup});




sequelize //.sync({force:true})
    .sync()
    .then(()=>{
    app.listen(3000, () => {
        console.log(`Server started on 3000`);
    });

})