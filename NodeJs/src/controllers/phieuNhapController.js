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

module.exports = {
    handleGetDSPhieuNhap,
}