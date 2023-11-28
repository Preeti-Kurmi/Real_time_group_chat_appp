const groupmodal = require('../modal/groupmodal');

const creategroup = async (req, res) => {
    try {

       const { groupname, userid } = req.body;
       console.log("g",groupname);

if (!groupname || !userid) {
    return res.status(400).json({ error: "Missing groupname or userid in the request body" });
}

        const userGroup = await groupmodal.create({
            groupname,
            isAdmin: true,
            userid
        });
        
        // Move the success response inside the try block
        res.status(200).json({ message: "User created group successfully",groupname:groupname});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Error creating group: ${err.message}` });

    }
};
const getgroupname = async (req, res) => {
    try {


        const group = await groupmodal.findAll();
        
        
        // Move the success response inside the try block
        res.status(200).json(group);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Error creating group: ${err.message}` });

    }
};

module.exports = {creategroup,getgroupname} ;
