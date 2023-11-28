const express=require('express');
const signupcontroller=require('../controller/singupcontroller')
const verify=require('../middleware/verifyuser');
const route=express.Router();
const messagecontroller=require('../controller/messagecontroller')
const groupcontroller=require('../controller/groupcontroller')

route.post('/signup',signupcontroller.signup);
route.post('/login',verify,signupcontroller.login);
route.post('/message',verify,messagecontroller.message);
route.get('/getmessage',verify,messagecontroller.getmessage);
route.post('/creategroup',groupcontroller.creategroup);
route.get('/getgroupname',groupcontroller.getgroupname);
module.exports=route;