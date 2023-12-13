const mysql = require("../util/database")
const Sequelize=require('sequelize');
const group = mysql.define('group',{
    groupid:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    groupname:{
        type:Sequelize.STRING,
        
    },
    
  
   userid:{
    type:Sequelize.INTEGER,
   },
})
module.exports=group;
