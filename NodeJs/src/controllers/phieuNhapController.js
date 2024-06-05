phieuNhapService = require("../services/phieuNhapService")

//LẤY DANH SÁCH PHIẾU NHẬP
handleGetDSPhieuNhap = async (req, res) => {
    let DSPhieuNhap = await phieuNhapService.getDSPhieuNhap();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSPhieuNhap
    })
}

//LẤY CHI TIẾT PHIẾU NHẬP
handleGetCTPN = async (req, res) => {
    let data = await phieuNhapService.getCTPN(req.body.idPN);
    return res.status(200).json(data)
}

//CHECK CHI TIẾT PHIẾU NHẬP MỚI
handleCheckCTPN = async (req, res) => {
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
handleCreatePhieuNhap = async (req, res) => {
    let message = await phieuNhapService.createPhieuNhap(req.body)
    return res.status(200).json(message)
}
handleSearchPhieuNhap = async (req, res) => {
    let keyword = req.body.keyword
    if (!keyword) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập ngày tìm kiếm!"
        })
    }
    let data = await phieuNhapService.searchPhieuNhap(keyword)
    return res.status(200).json(data)
}
module.exports = {
    handleGetDSPhieuNhap,
    handleGetCTPN,
    handleSearchPhieuNhap,
    handleCheckCTPN,
   // handleCreatePhieuNhap
}