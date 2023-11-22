const Message=require('../modal/messagemodel');

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

module.exports={message};