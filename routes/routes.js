const express=require('express');
const signupcontroller=require('../controller/singupcontroller')
const verify=require('../middleware/verifyuser');
const route=express.Router();
const messagecontroller=require('../controller/messagecontroller')
route.post('/signup',signupcontroller.signup);
route.post('/login',verify,signupcontroller.login);
route.post('/message',verify,messagecontroller.message);
module.exports=route;