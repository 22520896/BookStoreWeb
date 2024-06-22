hoaDonService = require("../services/hoaDonService")

//LẤY DANH SÁCH HÓA ĐƠN
let handleGetDSHoaDon = async (req, res) => {
    let DSHoaDon = await hoaDonService.getDSHoaDon();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSHoaDon
    })
}

//XEM CHI TIẾT HÓA ĐƠN
let handleGetCTHD = async (req, res) => {
    let data = await hoaDonService.getCTHD(req.body.idHD);
    return res.status(200).json(data)   
}


//CHECK CHI TIẾT HÓA ĐƠN
let handleCheckCTHD = async (req, res) => {
    if (!req.body.sach || !req.body.soLuong) {
        return res.status(500).json({
            errCode: 1,
            message: 'Vui lòng nhập đầy đủ thông tin về tên sách và số lượng bán!'
        })
    }
    else {
        let data = await hoaDonService.checkCTHD(req.body)
        return res.status(200).json(data)
    }
}

//CHECK KHÁCH HÀNG
let handleCheckKhachHang = async (req, res) => {
    let data = await hoaDonService.checkKhachHang(req.body)
    return res.status(200).json(data)
}


//THÊM HÓA ĐƠN MỚI
let handleCreateHoaDon = async (req, res) => {
    if (req.body.CTHD.length === 0) {
        return res.status(500).json({
            errCode: 1,
            message: "Hóa đơn phải có ít nhất một chi tiết!"
        })
    }
    let message = await hoaDonService.createHoaDon(req.body)
        return res.status(200).json(message)
}

//TÌM KIẾM HÓA ĐƠN
let handleSearchHoaDon = async (req, res) => {
    let type = req.query.type
    let keyword = req.query.keyword
    if (!keyword || !type) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đầy đủ thông tin!"
        })
    }
    let data = await hoaDonService.searchHoaDon(type,keyword)
    return res.status(200).json(data)
}

module.exports = {
    handleGetDSHoaDon,
    handleGetCTHD,
    handleCheckCTHD,
    handleCheckKhachHang,
    handleCreateHoaDon,
    handleSearchHoaDon
}