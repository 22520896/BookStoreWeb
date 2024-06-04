taiKhoanService = require("../services/taiKhoanService")

//LOGIN
let handleLogin = async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đầy đủ thông tin!"
        })
    }

    let data = await taiKhoanService.handleLogin(username, password)
    return res.status(200).json({
        errCode: data.errCode,
        message: data.message,
        taiKhoan: data.taiKhoan ? data.taiKhoan : {}
    })
}


//LẤY DANH SÁCH TÀI KHOẢN
handleGetDSTaiKhoan = async (req, res) => {
    let DSTaiKhoan = await taiKhoanService.getDSTaiKhoan();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSTaiKhoan
    })
}


//THÊM TÀI KHOẢN MỚI
handleCreateTaiKhoan = async (req, res) => {
    let message = await taiKhoanService.createTaiKhoan(req.body)
    return res.status(200).json(message)
}


//CHỈNH SỬA THÔNG TIN TÀI KHOẢN
handleEditTaiKhoan = async (req, res) => {
    let data = req.body
    let message = await taiKhoanService.editTaiKhoan(data)
    return res.status(200).json(message)
}


//XÓA TÀI KHOẢN
handleDeleteTaiKhoan = async (req, res) => {
    let message = await taiKhoanService.deleteTaiKhoan(req.body.idTK)
    return res.status(200).json(message)
}

module.exports = {
    handleLogin,
    handleGetDSTaiKhoan,
    handleCreateTaiKhoan,
    handleEditTaiKhoan,
    handleDeleteTaiKhoan,
}