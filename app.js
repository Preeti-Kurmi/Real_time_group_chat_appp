const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes=require('./routes/routes')
const mysql=require('./util/database');
const server = require("http").createServer(app);
const path=require('path');
const User=require('./modal/signupmodal');
const Group =require('./modal/groupmodal');
const Message=require('./modal/messagemodel');
const Usergroup=require('./modal/usergroup')
const { message } = require('./controller/messagecontroller');

 const io=require('socket.io')(server,{
  cors:{
    origin:'*'
  }
 });

require('dotenv').config();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/',routes);
// app.use(express.static(path.join(__dirname, 'Frontend')));


  io.on('connection', socket => {
    console.log("connected");
    socket.on('send-message',message=>{
      console.log("message from socket",message);
      socket.broadcast.emit("received",message)
    })
    socket.on('user-joined', name => {
      console.log("new user",name)
                                     
      socket.broadcast.emit('user-joined-now', name);
  
    });
  
    // // send-message event and recieve-message broadcast
    // socket.on('send', (message) => {
      
    //   socket.broadcast.emit('receive', {message:message,name:users[socket.id]});
    // });
  
})
  // )
  
User.hasMany(Message)
Message.belongsTo(User, { foreignKey: 'userId' });

//  Group.belongsToMany(User, {through: Usergroup ,foreignKey: 'groupId' });
// User.belongsToMany(Group, {through: Usergroup , foreignKey: 'userId' });
Group.belongsToMany(User, {through: Usergroup});
User.belongsToMany(Group, {through: Usergroup});


mysql.sync({ force:false})
  .then((res) => {
    console.log(res.data);
    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);

  });
