const express = require('express') //commonjs import express
require('dotenv').config()
var cors = require('cors')

const configViewEngine = require('./config/viewEngine')
const api = require('./routes/api')
const connectDB = require('./config/connectDB')

const corsOptions = {
  origin: ['http://localhost:3000', 'https://book-store-web-two.vercel.app'],
  credentials: true, // Cho phép gửi cookie
};


const app = express() // app của express
const port = process.env.PORT || 8083 // port
const hostname = process.env.HOST_NAME


app.use(cors(corsOptions));
// config template engine, static file
configViewEngine(app)

//khai báo route
app.use('/', api)

connectDB()


//chạy server
//nạp các thông tin khai báo ở trên rồi chạy
app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})