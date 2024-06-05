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


//LẤY CHI TIẾT PHIẾU THU
handleGetCTPT = async (req, res) => {
    let data = await phieuThuService.getCTPT(req.body.idPT);
    return res.status(200).json(data)
}

//TÌM KIẾM PHIẾU THU
handleSearchPhieuThu = async (req, res) => {
    let type = req.body.type
    let keyword = req.body.keyword
    if (!keyword || !type) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đầy đủ thông tin!"
        })
    }
    let data = await phieuThuService.searchPhieuThu(type,keyword)
    return res.status(200).json(data)
}

//THÊM PHIẾU THU MỚI
handleCreatePhieuThu = async (req, res) => {
    let message = await phieuThuService.createPhieuThu(req.body)
    return res.status(200).json(message)
}
module.exports = {
    handleGetDSPhieuThu,
    handleGetCTPT,
    handleCreatePhieuThu,
    handleSearchPhieuThu
}