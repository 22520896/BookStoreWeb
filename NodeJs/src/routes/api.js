const express = require('express')
const router = express.Router()
const taiKhoanController = require("../controllers/taiKhoanController")
const sachController = require("../controllers/sachController")
const phieuNhapController = require("../controllers/phieuNhapController")
const phieuThuController = require("../controllers/phieuThuController")
const khachHangController = require("../controllers/khachHangController")
const baoCaoController = require("../controllers/baoCaoController")
const hoaDonController = require("../controllers/hoaDonController")

//QUẢN LÝ TÀI KHOẢN
router.post('/login', taiKhoanController.handleLogin) //Login
router.get('/get-ds-taikhoan', taiKhoanController.handleGetDSTaiKhoan) //Lấy danh sách tài khoản
router.get('/search-taikhoan', taiKhoanController.handleSearchTaiKhoan) //Tìm kiếm tài khoản
router.post('/create-taikhoan', taiKhoanController.handleCreateTaiKhoan) //Thêm tài khoản mới
router.put('/edit-taikhoan', taiKhoanController.handleEditTaiKhoan) //Chỉnh sửa thông tin tài khoản
router.delete('/delete-taikhoan', taiKhoanController.handleDeleteTaiKhoan) //Xóa tài khoản

//TRA CỨU SÁCH
router.get('/get-ds-sach', sachController.handleGetDSSach)//Lấy danh sách sách
router.get('/search-sach',sachController.handleSearchSach)//Tìm kiếm phiếu sách

//QUẢN LÝ NHẬP SÁCH
router.get('/get-ds-phieunhap', phieuNhapController.handleGetDSPhieuNhap)//Lấy danh sách phiếu nhập
router.get('/get-chitietphieunhap', phieuNhapController.handleGetCTPN)//Xem chi tiết phiếu nhập
router.get('/check-chitietphieunhap',phieuNhapController.handleCheckCTPN) //Check chi tiết phiếu nhập
//router.post('/create-phieunhap', phieuNhapController.handleCreatePhieuNhap) //Thêm phiếu nhập mới
router.get('/search-phieunhap',phieuNhapController.handleSearchPhieuNhap)//Tìm kiếm phiếu nhập

//QUẢN LÝ THU TIỀN
router.get('/get-ds-phieuthu', phieuThuController.handleGetDSPhieuThu)//Lấy danh sách phiếu thu
router.get('/search-phieuthu',phieuThuController.handleSearchPhieuThu) //Tìm kiếm phiếu thu
router.get('/get-chitietphieuthu', phieuThuController.handleGetCTPT) //Xem chi tiết phiếu thu
router.post('/create-phieuthu',phieuThuController.handleCreatePhieuThu) // Thêm phiếu thu mới

//QUẢN LÝ KHÁCH HÀNG
router.get('/get-ds-khachhang',khachHangController.handleGetDSKhachHang)//Lấy danh sách khách hàng

//BÁO CÁO
router.get('/get-ds-baocao', baoCaoController.handleGetBaoCao)//Lấy danh sách báo cáo

//HÓA ĐƠN
router.get('/search-hoadon',hoaDonController.handleSearchHoaDon)//Tìm kiếm hóa đơn

//router.post('')
module.exports = router