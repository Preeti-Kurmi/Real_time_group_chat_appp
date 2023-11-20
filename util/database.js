
const sequelize=require('sequelize');
const mysql=new sequelize('groupchat','root','Sagar!@#123',{
    host:'localhost',
    dialect:'mysql'
    
})
module.exports=mysql;