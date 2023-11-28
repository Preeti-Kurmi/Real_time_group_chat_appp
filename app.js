const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes=require('./routes/routes')
const mysql=require('./util/database');
const server = require("http").createServer(app);
const path=require('path');

 const io=require('socket.io')(server);

require('dotenv').config();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/',routes);
// app.use(express.static(path.join(__dirname, 'Frontend')));

const users = [];
  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("user-joined", (usertoken) => {
      const user = jwt.decode(usertoken);
      users[socket.id] = user;                                      
      socket.broadcast.emit("user-joined-broadcast", user);
  
    });
  
    // send-message event and recieve-message broadcast
    socket.on("send-message", (message) => {
      const user = jwt.decode(message.token);
      const userb = users[socket.id];
      const data =  { user: user.name, message: message.message }
      socket.broadcast.emit("receive-message", data);
    });
  
// user-left event & broadcast it executes automatically when user log out or close the tab, inbuilt socket.io feature
    socket.on("disconnect", () => {
      const user = users[socket.id];
      delete users[socket.id];
      socket.broadcast.emit("user-left", user.name);
    });
  });
// io.on('connection', (socket) => {
//   console.log('User connected');

//   // Listen for the 'send-message' event from the client
//   socket.on('new user joined', name => {
//     users[socket.id]=name;
    
//      socket.broadcast.emit('user-joined',name)
//   });
// });
//   // Add other Socket.IO event handlers as needed...

//   // Listen for the 'disconnect' event
// //   socket.on('disconnect', () => {
// //       console.log('User disconnected');
// //   });
// // });



mysql.sync({ force: false})
  .then((res) => {
    console.log(res.data);
    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
