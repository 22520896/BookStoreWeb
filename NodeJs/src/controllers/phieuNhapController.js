phieuNhapService = require("../services/phieuNhapService")

//LẤY DANH SÁCH PHIẾU NHẬP
let handleGetDSPhieuNhap = async (req, res) => {
    let DSPhieuNhap = await phieuNhapService.getDSPhieuNhap();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSPhieuNhap
    })
}


//XEM CHI TIẾT PHIẾU NHẬP
let handleGetCTPN = async (req, res) => {
    let data = await phieuNhapService.getCTPN(req.body.idPN);
    return res.status(200).json(data)
}


//CHECK CHI TIẾT PHIẾU NHẬP MỚI
let handleCheckCTPN = async (req, res) => {
    if (!req.body.tenSach || !req.body.soLuong) {
        return res.status(500).json({
            errCode: 6,
            message: 'Vui lòng nhập đầy đủ thông tin về tên sách và số lượng nhập!'
        })
    }
    else {
        let data = await phieuNhapService.checkCTPN(req.body)
        return res.status(200).json(data)
    }
}


//THÊM PHIẾU NHẬP MỚI
let handleCreatePhieuNhap = async (req, res) => {
    if (req.body.CTPN.length === 0) {
        return res.status(500).json({
            errCode: 1,
            message: "Phiếu nhập phải có ít nhất một chi tiết!"
        })
    }
    let message = await phieuNhapService.createPhieuNhap(req.body)
    return res.status(200).json(message)
}


//TÌM KIẾM PHIẾU NHẬP
let handleSearchPhieuNhap = async (req, res) => {
    let type = req.query.type
    let keyword = req.query.keyword
    if (!keyword || !type) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đầy đủ thông tin!"
        })
    }
    let data = await phieuNhapService.searchPhieuNhap(type, keyword)
    return res.status(200).json(data)
}
module.exports = {
    handleGetDSPhieuNhap,
    handleGetCTPN,
    handleSearchPhieuNhap,
    handleCheckCTPN,
    handleCreatePhieuNhap
}