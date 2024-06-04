const express = require('express')
const router = express.Router()
const taiKhoanController = require("../controllers/taiKhoanController")


//QUẢN LÝ TÀI KHOẢN
router.post('/login', taiKhoanController.handleLogin) //Login
router.get('/get-ds-taikhoan', taiKhoanController.handleGetDSTaiKhoan) //Lấy danh sách tài khoản
router.post('/create-taikhoan', taiKhoanController.handleCreateTaiKhoan) //Thêm tài khoản mới
router.put('/edit-taikhoan', taiKhoanController.handleEditTaiKhoan) //Chỉnh sửa thông tin tài khoản
router.delete('/delete-taikhoan', taiKhoanController.handleDeleteTaiKhoan) //Xóa tài khoản


module.exports = router