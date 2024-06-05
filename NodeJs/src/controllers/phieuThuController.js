phieuThuService = require("../services/phieuThuService")

//LẤY DANH SÁCH PHIẾU THU
handleGetDSPhieuThu = async (req, res) => {
    let DSPhieuThu = await phieuThuService.getDSPhieuThu();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSPhieuThu
    })
}

//XEM CHI TIẾT PHIẾU THU
handleGetCTPT = async (req, res) => {
    let CTPT = await phieuNhapService.getCTPT(req.body.idPT);
    return res.status(200).json(CTPT)
}

//THÊM PHIẾU THU
handleCreatePhieuThu = async (req, res) => {
    let message = await phieuThuService.createPhieuThu(req.body)
    return res.status(200).json(message)
}
module.exports = {
    handleGetDSPhieuThu,
    handleGetCTPT,
    handleCreatePhieuThu,
}