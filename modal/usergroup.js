const Sequelize = require('sequelize'); //table
const mysql = require('../util/database'); //connected object

const GroupUser =mysql.define('usergroup', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
})
module.exports = GroupUser;