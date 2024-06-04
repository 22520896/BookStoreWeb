const db = require('../models/index');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10)


let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let taiKhoan = await db.TaiKhoan.findOne({
                where: { username: username },
            })
            if (taiKhoan) {
                resolve(true)
            } else { resolve(false) }

        } catch (e) {
            reject(e)
        }
    })
}

//LOGIN
let handleLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {}
            let taiKhoan = await db.TaiKhoan.findOne({
                attributes: ['username', 'password', 'vaiTro', 'hoTen'],
                where: { username: username },
                raw: true
            })

            if (taiKhoan) {
                let check = await bcrypt.compareSync(password, taiKhoan.password)
                if (check) {
                    data.errCode = 0
                    data.message = 'OK'
                    delete taiKhoan.password
                    data.taiKhoan = taiKhoan
                }
                else {
                    data.errCode = 3
                    data.message = 'Sai mật khẩu!'
                }
            } else {
                data.errCode = 2
                data.message = "Username không tồn tại!"
            }

            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}


//LẤY DANH SÁCH TÀI KHOẢN
let getDSTaiKhoan = () => {
    return new Promise(async (resolve, reject) => {
        try {
            DSTaiKhoan = await db.TaiKhoan.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            resolve(DSTaiKhoan)
        } catch (e) {
            reject(e)
        }
    })
}


//THÊM TÀI KHOẢN MỚI 
let createTaiKhoan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            check = await checkUsername(data.username)
            if (!check) {
                let hashPasswordFromBcrypt = await hashPassword(data.password)
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
                    message: "Thêm tài khoản mới thành công!"
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


//CHỈNH SỬA THÔNG TIN TÀI KHOAN
let editTaiKhoan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let taiKhoan = await db.TaiKhoan.findOne({
                where: { idTK: data.idTK },
                raw: false
            })
            if (taiKhoan) {
                await taiKhoan.update({
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


//XÓA TÀI KHOẢN
let deleteTaiKhoan = (idTK) => {
    return new Promise(async (resolve, reject) => {
        try {
            let taiKhoan = await db.TaiKhoan.findOne({
                where: { idTK: idTK },
                raw: false
            })
            
            if (taiKhoan) {
                await taiKhoan.destroy() 
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




module.exports = {
    handleLogin,
    getDSTaiKhoan,
    createTaiKhoan,
    editTaiKhoan,
    deleteTaiKhoan,    
}