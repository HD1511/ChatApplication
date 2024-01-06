const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Mongo = require('./Connection/mongoose.js');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

Mongo();

// dependency for real time chat application
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

// all routers
const router = require('./Routers/Routes.js');

// all middlewares
app.use(cors({
  origin: process.env.FRONTEND_URI,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('tiny'));
app.use(cookieParser());

// code for real time chat application
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// all api's for react
app.use('/api', router);
// app.use('/api/v1', SignUpRouter);
// app.use('/api/v1', LogOutRouter);
// app.use('/api/v1', AuthenticationRouter);
// app.use('/api/v1', UserSearchingRouter);
// app.use('/api/v1', PendingFriendRequestRouter);
// app.use('/api/v1', AcceptedFriendRequestRouter);
// app.use('/api/v1', ChatMessagesRouter);

app.get('/', (req, res) => {
  res.send('Okay');
});

let UserList = {};
let SocketMapping = {};

io.on('connection', (socket) => {
  console.log(`a user connected with ${socket.id}`);

  socket.on('Update_UserList', (data) => {

    if (UserList[data] === undefined) {
      UserList[data] = [];
    }

    UserList[data].push(socket.id);
    SocketMapping[socket.id] = data;

    console.log('UserList connect is here : ');
    console.log(UserList);
    console.log('SocketMapping connect is here : ');
    console.log(SocketMapping);

  });

  socket.on('Pending-request', ({ senderId, recieverId, senderName, senderAvatar }) => {
    if (UserList[recieverId]) {
      for (let i = 0; i < UserList[recieverId].length; i++) {
        io.to(UserList[recieverId][i]).emit('pendingRequests');
      }recieverId
    }
  })

  socket.on('Send-chat-message', ({Data,anotherId}) => {
    console.log('kh');
    if (UserList[anotherId]) {
      for (let i = 0; i < UserList[anotherId].length; i++) {
        io.to(UserList[anotherId][i]).emit('chatMessageRecieve',Data);
      }
    }
  })
  
  socket.on('Update-user-list', (senderId) => {
    if (UserList[senderId]) {
      for (let i = 0; i < UserList[senderId].length; i++) {
        io.to(UserList[senderId][i]).emit('updateUserList');
      }
    }
  })

  socket.on('disconnect', () => {
    console.log(`user disconnected ${socket.id}`);

    UserList[SocketMapping[socket.id]] = UserList[SocketMapping[socket.id]].filter(item => item !== socket.id);
    delete SocketMapping[socket.id];

    console.log('UserList disconnect is here : ');
    console.log(UserList);
    console.log('SocketMapping disconnect is here : ');
    console.log(SocketMapping);

  });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});