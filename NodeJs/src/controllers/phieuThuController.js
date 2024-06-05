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

module.exports = {
    handleGetDSPhieuThu,
}