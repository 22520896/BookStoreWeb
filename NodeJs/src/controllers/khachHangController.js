khachHangService = require("../services/khachHangService")

//LẤY DANH SÁCH PHIẾU THU
handleGetDSKhachHang = async (req, res) => {
    let DSKhachHang = await khachHangService.getDSKhachHang();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSKhachHang
    })
}

module.exports = {
    handleGetDSKhachHang,
}