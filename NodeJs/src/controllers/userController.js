userService = require("../services/userService")

let handleLogin = async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập đầy đủ thông tin!"
        })
    }

    let userData = await userService.handleUserLogin(username, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

handleGetAllUsers = async (req, res) => {
    let id = req.query.id //ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Không tìm thấy id!',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })
}

handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.editUser(data)
    return res.status(200).json(message)
}

handleDeleteUser = async (req, res) => {
    // if(!res.body.id){
    //     return res.status(200).json({
    //         errCode: 2,
    //         message:"Vui lòng nhập/chọn id!"
    //     })
    // }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
}