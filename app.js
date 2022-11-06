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


//body-paraser
app.use(bodyParsed.json());
app.use(bodyParsed.urlencoded({ extended: true }));


//routes
const userRoutes=require('./routes/user');
const chatAppRoutes=require('./routes/chatapp');

app.use('/user',userRoutes);
app.use('/chatApp',chatAppRoutes);

//Relation between tables
User.hasMany(Message);
Message.belongsTo(User);



sequelize //.sync({force:true})
    .sync()
    .then(()=>{
    app.listen(3000, () => {
        console.log(`Server started on 3000`);
    });

})