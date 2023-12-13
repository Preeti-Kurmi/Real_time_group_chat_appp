
const mysql = require('../util/database');
const Sequelize=require('sequelize');
const User = require('./signupmodal');

const Message = mysql.define('message',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    
    message:{
        type:Sequelize.STRING,
    },
    name:{
        type:Sequelize.STRING,
    },
  

  
})


module.exports = Message;