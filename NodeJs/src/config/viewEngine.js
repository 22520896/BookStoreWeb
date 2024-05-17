const path = require('path')
const express = require('express')
var bodyParser = require('body-parser')

//template (bộ khung định sẵn) engines (view) -ejs => At runtime, template engine sẽ biến đổi file view thành html gửi chp client
const configViewEngine = (app) => {
    //config template engine - trước khai báo route
    app.set('views', path.join('./src', 'views')) //template sẽ được lưu ở đâu - phải dùng đường dẫn tuyệt đối
    app.set('view enngine', 'ejs') //sử dụng template engine gì 
    
    //config static files: hiển thị hình ảnh, tải file css, js
    app.use(express.static(path.join('./src', 'public')))
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

}

module.exports = configViewEngine