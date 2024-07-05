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
router.get('/get-ds-sach', sachController.handleGetDSSach) //Lấy danh sách sách
router.get('/search-sach', sachController.handleSearchSach) //Tìm kiếm sách

//QUẢN LÝ KHÁCH HÀNG
router.get('/get-ds-khachhang', khachHangController.handleGetDSKhachHang) //Lấy danh sách khách hàng
router.post('/create-khachhang', khachHangController.handleCreateKhachHang) //Thêm khách hàng mới
router.put('/edit-khachhang', khachHangController.handleEditKhachHang) //Chỉnh sửa thông tin khách hàng
router.delete('/delete-khachhang', khachHangController.handleDeleteKhachHang) //Xóa khách hàng
router.get('/search-khachhang', khachHangController.handleSearchKhachHang) //Tìm kiếm khách hàng

//QUẢN LÝ NHẬP SÁCH
router.get('/get-ds-phieunhap', phieuNhapController.handleGetDSPhieuNhap) //Lấy danh sách phiếu nhập
router.get('/get-chitietphieunhap', phieuNhapController.handleGetCTPN) //Xem chi tiết phiếu nhập
router.post('/check-chitietphieunhap',phieuNhapController.handleCheckCTPN) //Check chi tiết phiếu nhập
router.post('/create-phieunhap', phieuNhapController.handleCreatePhieuNhap) //Thêm phiếu nhập mới
router.get('/search-phieunhap', phieuNhapController.handleSearchPhieuNhap) //Tìm kiếm phiếu nhập
router.get('/refer-sach', phieuNhapController.handleReferSach) //Tham chiếu để tim thông tin tương ứng với sách

//QUẢN LÝ BÁN SÁCH
router.get('/get-ds-hoadon', hoaDonController.handleGetDSHoaDon) //Lấy danh sách hóa đơn
router.get('/get-chitiethoadon', hoaDonController.handleGetCTHD) //Xem chi tiết hóa đơn
router.post('/check-chitiethoadon', hoaDonController.handleCheckCTHD) //Check chi tiết hóa đơn
router.post('/check-khachhang',hoaDonController.handleCheckKhachHang) //Check khách hàng
router.post('/create-hoadon', hoaDonController.handleCreateHoaDon) //Thêm hóa đơn mới
router.get('/search-hoadon',hoaDonController.handleSearchHoaDon) //Tìm kiếm hóa đơn

//QUẢN LÝ THU TIỀN
router.get('/get-ds-phieuthu', phieuThuController.handleGetDSPhieuThu) //Lấy danh sách phiếu thu
router.get('/get-chitietphieuthu', phieuThuController.handleGetCTPT) //Xem chi tiết phiếu thu
router.post('/check-chitietphieuthu',phieuThuController.handleCheckCTPT) //Check chi tiết phiếu thu
router.post('/create-phieuthu',phieuThuController.handleCreatePhieuThu) // Thêm phiếu thu mới
router.get('/search-phieuthu',phieuThuController.handleSearchPhieuThu) //Tìm kiếm phiếu thu

//BÁO CÁO
router.get('/get-baocao', baoCaoController.handleGetBaoCao) //Xuất báo cáo



module.exports = router