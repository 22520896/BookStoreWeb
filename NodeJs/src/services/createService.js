const bcrypt = require('bcrypt');
const db = require('../models/index');
const { raw } = require('body-parser');


const salt = bcrypt.genSaltSync(10)


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.TaiKhoan.create({
                username: data.username,
                password: hashPasswordFromBcrypt,
                vaiTro: data.vaiTro,
                hoTen: data.hoTen,
                diaChi: data.diaChi,
                sdt: data.sdt
            },
            )
            resolve('Tạo tài khoản mới thành công!')
        } catch (e) {
            reject(e)
        }
    })
}


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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.TaiKhoan.findAll({
                raw: true
            })
            resolve(users)
        } catch (error) {

        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.TaiKhoan.findOne({
                where: { id: userId },
                raw: true
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })

}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.TaiKhoan.findOne({
                where: { id: data.id }
            })
            if (user) {
                await user.update({
                    username: data.username,
                    vaiTro: data.vaiTro,
                    hoTen: data.hoTen,
                    diaChi: data.diaChi,
                    sdt: data.sdt
                })

                let AllUsers = await db.TaiKhoan.findAll();
                resolve(AllUsers)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.TaiKhoan.findOne({
                where: { id: userId },
            })
            if (user) {
                await user.destroy()
            }
            resolve() //return

        } catch (e) {
            reject(e)
        }
    })

}

module.exports = {
    createNewUser, getAllUser, getUserInfoById, updateUserData, deleteUserById
}