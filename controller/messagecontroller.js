const Message=require('../modal/messagemodel');
const User=require('../modal/signupmodal')

const message=async(req,res)=>{
    try{
    console.log("message",req.body.message)

    const message=Message.create({
        userid:req.userid,
        message:req.body.message,
        

    })
    res.status(200).json({message:"updated message database"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error stored in database"})
    }
}
const getmessage=async(req,res)=>{
    try{
    console.log("message",req.body.message)

    const message=await Message.findAll();
   // const name =await User.findOne({where:{id:req.userid}})
   // let fname=name.name;
    //console.log(name.name)
    res.status(200).json({message})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error stored in database"})
    }
}

module.exports={message,getmessage};