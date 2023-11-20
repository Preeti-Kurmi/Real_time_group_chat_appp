const express=require('express');
const signupcontroller=require('../controller/singupcontroller')
const route=express.Router();
route.post('/signup',signupcontroller.signup);
route.post('/login',signupcontroller.login);
module.exports=route;