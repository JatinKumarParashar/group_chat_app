const express=require('express');
const bodyParsed=require('body-parser');
const cors=require('cors');


app=express();

const sequelize = require('./util/database');


app.use(bodyParsed.json());
app.use(bodyParsed.urlencoded({ extended: true }));





app.use(cors());

const userRoutes=require('./routes/user');

app.use('/user',userRoutes);

sequelize //.sync({force:true})
    .sync()
    .then(()=>{
    app.listen(3000, () => {
        console.log(`Server started on 3000`);
    });

})