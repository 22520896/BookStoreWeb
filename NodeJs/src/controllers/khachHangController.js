khachHangService = require("../services/khachHangService")

//LẤY DANH SÁCH KHÁCH HÀNG
handleGetDSKhachHang = async (req, res) => {
    let DSKhachHang = await khachHangService.getDSKhachHang();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSKhachHang
    })
}
//LẤY DANH SÁCH KHÁCH HÀNG
handleGetDSKhachHang = async (req, res) => {
    let DSKhachHang = await khachHangService.getDSKhachHang();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSKhachHang
    })
}


//THÊM KHÁCH HÀNG MỚI
handleCreateKhachHang = async (req, res) => {
    let message = await khachHangService.createKhachHang(req.body)
    return res.status(200).json(message)
}

//TÌM KIẾM KHÁCH HÀNG
handleSearchKhachHang = async (req, res) => {
    let type = req.body.type
    let keyword = req.body.keyword
    if (!type) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng chọn mục tìm kiểm!"
        })
    }
    if (!keyword) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập từ khóa tìm kiếm!"
        })
    }
    let data = await khachHangService.searchKhachHang(type, keyword)
    return res.status(200).json(data)
}

//CHỈNH SỬA THÔNG TIN KHÁCH HÀNG
handleEditKhachHang = async (req, res) => {
    let data = req.body
    let message = await khachHangService.editKhachHang(data)
    return res.status(200).json(message)
}


//XÓA TÀI KHOẢN
handleDeleteKhachHang = async (req, res) => {
    let message = await khachHangService.deleteKhachHang(req.body.sdt)
    return res.status(200).json(message)
}


module.exports = {
    handleGetDSKhachHang,
    handleSearchKhachHang,
    handleCreateKhachHang,
    handleEditKhachHang,
    handleDeleteKhachHang,
}