const db = require('../models/index');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10)

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let user = await db.TaiKhoan.findOne({
                attributes: ['username', 'password', 'vaiTro'],
                where: { username: username },
                raw: true
            })

            if (user) {
                let check = await bcrypt.compareSync(password, user.password)
                if (check) {
                    userData.errCode = 0
                    userData.errMessage = 'OK'
                    delete user.password
                    userData.user = user
                }
                else {
                    userData.errCode = 3
                    userData.errMessage = 'Sai mật khẩu!'
                }
            } else {
                userData.errCode = 2
                userData.errMessage = "Username không tồn tại!"
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.TaiKhoan.findOne({
                where: { username: username },
            })
            if (user) {
                resolve(true)
            } else { resolve(false) }

        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            users = ""
            if (id === "ALL") {
                users = await db.TaiKhoan.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (id && id !== "ALL") {
                users = await db.TaiKhoan.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            check = await checkUsername(data.username)
            if (!check) {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.TaiKhoan.create({
                    username: data.username,
                    password: hashPasswordFromBcrypt,
                    vaiTro: data.vaiTro,
                    hoTen: data.hoTen,
                    diaChi: data.diaChi,
                    sdt: data.sdt
                })
                resolve({
                    errCode: 0,
                    message: "Tạo tài khoản mới thành công!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Username đã tồn tại, vui lòng nhập lại username khác!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.TaiKhoan.findOne({
                where: { id: id },
                raw: false
            })
            if (user) {
                await user.destroy() //= await db.TaiKhoan.destroy(where: {id: id})
                resolve({
                    errCode: 0,
                    message: "Xóa tài khoản thành công!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Tài khoản không tồn tại!"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.TaiKhoan.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                await user.update({
                    hoTen: data.hoTen,
                    diaChi: data.diaChi,
                    sdt: data.sdt,
                    vaiTro: data.vaiTro,
                })
                resolve({
                    errCode: 0,
                    message: "Cập nhật tài khoản thành công!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Không tìm thấy tài khoản!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}






module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser
}