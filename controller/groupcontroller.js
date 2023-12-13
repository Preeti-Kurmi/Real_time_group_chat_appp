const { where } = require('sequelize');
const groupmodal = require('../modal/groupmodal');
const Usermodel=require('../modal/signupmodal')
const Usergroup=require('../modal/usergroup');
const { response } = require('express');


const creategroup = async (req, res) => {
    try {

       const { groupname, userid } = req.body;
       
       console.log("g",groupname);
       if (!groupname || !userid) {
        return res.status(400).json({ error: "Missing groupname or userid in the request body" });
    }
    //    const Userdetail= await Usermodel.findOne({where:{id:userid}})
    //    console.log("uuuu",Userdetail,userid);



        const result = await groupmodal.create({
            groupname,
            userid
        });
       
        console.log("rrr",result.groupid);
        await Usergroup.create({
            groupGroupid:result.groupid,
            signupId:userid
        })
        

        // Move the success response inside the try block
        res.status(200).json({ message: "User created group successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Error creating group: ${err.message}` });

    }
};

const getgroupname = async (req, res) => {
    try {
        console.log("id",req.params.id);

    
        const userGroups = await groupmodal.findAll({
            where: {userid:req.params.id }
           
        });
        // console.log("group",userGroups[0].groupname);
        res.status(200).json(userGroups);}

catch(err){
    res.status(500).json(err)
}

}

const addMember = async (req, res)=>{
    const groupId = req.body.activeGroupId;
    const email = req.body.email;
    
    try{
        const memberToAdd = await Usermodel.findOne({where:{email:email}})  
       
        await Usergroup.create({groupGroupid: groupId, signupId: memberToAdd.id }) ;
        res.status(200).json({success: true, message: "Group created successfully",newGroupMember:{name: memberToAdd.name, id:memberToAdd.id,  message: "user added successfully"}})  
    }catch(err){
        res.status(500).json({message: "Error adding user to group", error:err})

    }
}

const fetchGroupUsers = async (req, res)=>{
    const groupId = req.params.id;
    try{
        const response = await Usergroup.findAll({where:{groupGroupid: groupId}});
        const users = await Promise.all(response.map(async(res)=>{
            const user = await Usermodel.findByPk(res.signupId);
            return {name: user.name, userId: user.id};
        }))
        console.log(users);
        res.status(200).json(users)
    }catch(err){
        console.log(err)
    }
    
}


const deleteMember = async (req, res)=>{
    const activeGroupId = req.params.activeGroupId;
    const userId = req.params.userId;
  
    console.log(activeGroupId, userId);

    try{
        const group = await groupmodal.findOne({where:{groupid:activeGroupId}}) 
        if(!group) return res.status(200).json({success: false, message: "group not found"})  

        if(group.groupid){
            await Usergroup.destroy({where:{groupGroupid:activeGroupId, signupId: userId}});
            return res.status(200).json({success: true, message: "Member removed from the group"})  
        }else{
           return  res.status(200).json({success: false, message: "user is not Admin"})  
        }
    }catch(err){
        return res.status(500).json({message: "Error deleting group-member", error:err})

    }
}

const exitGroup = async (req, res)=>{
    const activeGroupId = req.params.activeGroupId;
    const userId = req.params.userId;
    try{
        const usergroup = await Usergroup.findOne({where:{signupId:userId, groupGroupid:activeGroupId}}) 
       if(usergroup){
        await usergroup.destroy();
        res.status(200).json({success: true, message: "user left group successfully"})  
        }
        
    }catch(err){
        res.status(500).json({message: "user not found in group", error:err})

    }
}
const deleteGroup = async (req, res)=>{
    const activeGroupId = req.params.activeGroupId;
    // const userId = req.params.userId;
    try{
        const group = await groupmodal.findOne({where:{groupid:activeGroupId}}) 
        if(!group) return res.status(200).json({success: false, message: "group not found"})  

        if(group){
            await group.destroy();
            await Usergroup.destroy({where:{groupGroupid:activeGroupId}});
            return res.status(200).json({success: true, message: "Group deleted"})  
        }else{
           return  res.status(200).json({success: false, message: "user is not Admin"})  
        }
    }catch(err){
        return res.status(500).json({message: "Error deleting group", error:err})

    }
}








module.exports = {creategroup,getgroupname,addMember,fetchGroupUsers,deleteMember,exitGroup,deleteGroup} ;
