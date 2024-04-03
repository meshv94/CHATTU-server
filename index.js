const express = require('express')
const dotenv = require('dotenv')
var cookieParser = require('cookie-parser');
const cors = require('cors')

const connect_DB = require('./DataBase/connectDB.js')
const auth_router = require('./router/auth.routes.js')
const message_router = require('./router/message.routes.js')
const users_router = require('./router/users.routes.js')
const {app, server} = require('./socket/socket.js')


dotenv.config()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "*", // reflecting the request header
    methods: ['GET' , "POST"],
}))

app.use("/api/auth", auth_router)
app.use('/api/messages' , message_router)
app.use('/api/users' , users_router)


const PORT = process.env.PORT || 5000;

server.listen(PORT , () => {
    connect_DB()
    console.log(`Server is running on ${PORT}`)
})