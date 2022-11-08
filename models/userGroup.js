const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const userGroup=sequelize.define('userGroup',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
     isAdmin:{
        type:Sequelize.BOOLEAN,
       allowNull:false
    }
})


module.exports=userGroup;