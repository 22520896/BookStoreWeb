const express = require('express')
const router = express.Router()
const taiKhoanController = require("../controllers/taiKhoanController")
const sachController = require("../controllers/sachController")
const phieuNhapController = require("../controllers/phieuNhapController")
const phieuThuController = require("../controllers/phieuThuController")
const khachHangController = require("../controllers/khachHangController")
const baoCaoController = require("../controllers/baoCaoController")

//QUẢN LÝ TÀI KHOẢN 
router.post('/login', taiKhoanController.handleLogin) //Login
router.get('/get-ds-taikhoan', taiKhoanController.handleGetDSTaiKhoan) //Lấy danh sách tài khoản
router.get('/search-taikhoan', taiKhoanController.handleSearchTaiKhoan) //Tìm kiếm tài khoản
router.post('/create-taikhoan', taiKhoanController.handleCreateTaiKhoan) //Thêm tài khoản mới
router.put('/edit-taikhoan', taiKhoanController.handleEditTaiKhoan) //Chỉnh sửa thông tin tài khoản
router.delete('/delete-taikhoan', taiKhoanController.handleDeleteTaiKhoan) //Xóa tài khoản

//TRA CỨU SÁCH
router.get('/get-ds-sach', sachController.handleGetDSSach)//Lấy danh sách sách

//QUẢN LÝ NHẬP SÁCH
router.get('/get-ds-phieunhap', phieuNhapController.handleGetDSPhieuNhap)//Lấy danh sách phiếu nhập

//QUẢN LÝ THU TIỀN
router.get('/get-ds-phieuthu', phieuThuController.handleGetDSPhieuThu)//Lấy danh sách phiếu thu
router.get('/get-chitietphieuthu', phieuThuController.handleGetCTPT)//Xem chi tiết phiếu thu tiền
router.post('/post-themphieu', phieuThuController.handleCreatePhieuThu)//Thêm phiếu thu tiền

//QUẢN LÝ KHÁCH HÀNG
router.get('/get-ds-khachhang', khachHangController.handleGetDSKhachHang)//Lấy danh sách khách hàng
router.put('/edit-khachhang', khachHangController.handleEditKhachHang) //Chỉnh sửa thông tin khách hàng
router.delete('/delete-khachhang', khachHangController.handleDeleteKhachHang) //Xóa khách hàng
router.get('/search-khachhang', khachHangController.handleSearchKhachHang)//Tìm kiếm khách hàng
router.post('/create-khachhang', khachHangController.handleCreateKhachHang) //Tạo khách hàng

//BÁO CÁO
router.get('/get-ds-baocao', baoCaoController.handleGetBaoCao)//Lấy danh sách báo cáo

//router.post('')
module.exports = router