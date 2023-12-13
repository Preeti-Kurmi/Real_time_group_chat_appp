const { error } = require('console');
const signupmodel=require('../modal/signupmodal');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const secretekey='dsfhsjdfsdkjfskfjskfjsk';
require('dotenv').config();

const signup=async(req,res)=>{
    
    const name = req.body.name;
    const email = req.body.email;
    const phoneno=req.body.phoneno;
    const password = req.body.password;
  
     try{
        const emailduplicate=await signupmodel.findOne({where:{email:email}});
        if(emailduplicate){
            res.status(200).json({errors:'User Exist already'});
        }
        else{
             const salt=11;
            bcrypt.hash(password,salt,async(err,hash)=>{
                const user= await signupmodel.create({
                    name:name,
                    email:email,
                    phoneno:phoneno,
                    password:hash
            
            
                
                })
                    
    res.status(200).json({message:"Signup Successfully"});
            });
            

        
 
}}
    catch(err){
        console.log(err)
    }

}
function gettoken(id){
    const token=jwt.sign({userid:id},secretekey);
    console.log(token);
    return token;

}

const login=async(req,res)=>{
    try{
        const password=req.body.password;
    const log=await signupmodel.findOne({where:{email:req.body.email}});

    
    if(log){
        bcrypt.compare(password,log.password,(err,response)=>{
            if(err){
                return res.status(200).json("somehting went wrong");
            }
            else if(response){
                return res.status(200).json({message:'Login Successfully',token:gettoken(log.id),userid:log.id,name:log.name});

            }
            else{
                return res.status(200).json("You entered wrong password");
            }
        })
    }
    else{
        res.status(401).json("wrong password");
    }
    

}
catch(err){
    console.log(err);
}
}


module.exports={signup,login};
