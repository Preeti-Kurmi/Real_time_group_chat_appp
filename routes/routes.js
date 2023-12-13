const express=require('express');
const signupcontroller=require('../controller/singupcontroller')
const verify=require('../middleware/verifyuser');
const route=express.Router();
const messagecontroller=require('../controller/messagecontroller')
const groupcontroller=require('../controller/groupcontroller')

route.post('/signup',signupcontroller.signup);
route.post('/login',signupcontroller.login);
route.post('/message',verify,messagecontroller.message);
route.get('/getmessage',verify,messagecontroller.getmessage);
//grouproutes

route.post('/creategroup',groupcontroller.creategroup);
route.get('/getgroupname/:id',groupcontroller.getgroupname);
route.post('/addMember', groupcontroller.addMember);
route.get('/fetchGroupUsers/:id',groupcontroller.fetchGroupUsers);
route.delete('/deleteMember/:activeGroupId/:userId', groupcontroller.deleteMember);
route.delete('/exitGroup/:activeGroupId/:userId',  groupcontroller.exitGroup);
route.delete('/deleteGroup/:activeGroupId', groupcontroller.deleteGroup);


module.exports=route;