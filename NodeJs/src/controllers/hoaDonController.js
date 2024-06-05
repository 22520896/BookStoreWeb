hoaDonService = require("../services/hoaDonService")

//TÌM KIẾM HÓA ĐƠN
handleSearchHoaDon = async (req, res) => {
    let type = req.body.type
    let keyword = req.body.keyword
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
    handleSearchHoaDon
}