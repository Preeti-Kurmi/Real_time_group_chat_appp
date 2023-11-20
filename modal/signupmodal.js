const Sequelize = require('sequelize');
const mysql = require('../util/database');

const signup = mysql.define('signup',

    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        phoneno: {
            type: Sequelize.INTEGER,
            allowNull: false,

        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
        },
      
       




    });



module.exports = signup;