//khai báo route
//req (request) và res(response) là 2 obj trong môi trường Nodejs
//route '/' là homepage (localhost:3000 = localhost:3000/)
const express = require('express')
const router = express.Router()
const { getHomepage, getABC, getCRUD, postCRUD, displayCRUD, getEditCRUD, putCRUD, deleteCRUD } = require('../controllers/homeController')
const userController = require("../controllers/userController")

//router.method('/route', handler)
router.get('/', getHomepage)

//app.method(path, handler)
router.get('/abc', getABC)

router.get('/crud', getCRUD)

router.post('/post-crud', postCRUD)

router.get('/get-crud', displayCRUD)

router.get('/edit-crud', getEditCRUD)

router.post('/put-crud', putCRUD)

router.get('/delete-crud', deleteCRUD)

router.post('/api/login', userController.handleLogin)

router.get('/api/get-all-users', userController.handleGetAllUsers)

router.post('/api/create-new-user', userController.handleCreateNewUser)

router.put('/api/edit-user', userController.handleEditUser)

router.delete('/api/delete-user', userController.handleDeleteUser)

module.exports = router