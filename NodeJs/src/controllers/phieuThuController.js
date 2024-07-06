phieuThuService = require("../services/phieuThuService")

//LẤY DANH SÁCH PHIẾU THU
let handleGetDSPhieuThu = async (req, res) => {
    let DSPhieuThu = await phieuThuService.getDSPhieuThu();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSPhieuThu
    })
}


//LẤY CHI TIẾT PHIẾU THU
let handleGetCTPT = async (req, res) => {
    let data = await phieuThuService.getCTPT(req.query.idPT);
    return res.status(200).json(data)
}


//TÌM KIẾM PHIẾU THU
let handleSearchPhieuThu = async (req, res) => {
    let type = req.query.type
    let keyword = req.query.keyword
    if (!keyword || !type) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đầy đủ thông tin!"
        })
    }
    let data = await phieuThuService.searchPhieuThu(type,keyword)
    return res.status(200).json(data)
}


//CHECK CHI TIẾT PHIẾU THU
let handleCheckCTPT = async (req, res) => {
    if (!req.body.sdt || !req.body.soTienThu ) {
        return res.status(500).json({
            errCode: 1,
            message: 'Vui lòng nhập đầy đủ thông tin về số điện thoại khách hàng số tiền thu!'
        })
    }
    else {
        let data = await phieuThuService.checkCTPT(req.body)
        return res.status(200).json(data)
    }
}


//THÊM PHIẾU THU MỚI
let handleCreatePhieuThu = async (req, res) => {
    let message = await phieuThuService.createPhieuThu(req.body)
    return res.status(200).json(message)
}
module.exports = {
    handleGetDSPhieuThu,
    handleGetCTPT,
    handleCheckCTPT,
    handleCreatePhieuThu,
    handleSearchPhieuThu
}