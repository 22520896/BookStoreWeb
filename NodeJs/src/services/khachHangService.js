const db = require('../models/index');
const { Op } = require('sequelize')

// KIỂM TRA SỐ ĐIỆN THOẠI
let checkSdt = (sdt) => {
    return new Promise(async (resolve, reject) => {
        try {
            let khachHang = await db.KhachHang.findOne({
                where: { sdt: sdt },
            })
            if (khachHang) {
                resolve(true)
            } else { resolve(false) }

        } catch (e) {
            reject(e)
        }
    })
}

//LẤY DANH SÁCH KHÁCH HÀNG
let getDSKhachHang = () => {
    return new Promise(async (resolve, reject) => {
        try {
            DSKhachHang = await db.KhachHang.findAll()
            resolve(DSKhachHang)
        } catch (e) {
            reject(e)
        }
    })
}


//THÊM KHÁCH HÀNG MỚI 
let createKhachHang = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            check = await checkSdt(data.sdt)
            if (!check) {
                await db.KhachHang.create({
                    sdt: data.sdt,
                    ten: data.ten,
                    diaChi: data.diaChi,
                    email: data.email,
                    tienNo: data.tienNo
                })
                resolve({
                    errCode: 0,
                    message: "Thêm khách hàng mới thành công!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Khách hàng đã tồn tại, vui lòng nhập lại khách hàng khác!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


//TÌM KIẾM KHÁCH HÀNG
let searchKhachHang = (type, keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            DSKhachHang = await db.KhachHang.findAll({
                where: {
                    [type]: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
            data = {}

            if (!DSKhachHang.length) {
                data.errCode = 0
                data.message = 'OK'
                data.DSKhachHang = DSKhachHang
            }
            else {
                data.errCode = 2
                data.message = 'Không tìm thấy khách hàng có thông tin khớp với từ khóa!'
                data.DSKhachHang = DSKhachHang
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}


//CHỈNH SỬA THÔNG TIN KHÁCH HÀNG
let editKhachHang = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let khachHang = await db.KhachHang.findOne({
                where: { sdt: data.sdt },
                raw: false
            })
            if (khachHang) {
                await khachHang.update({
                    ten: data.ten,
                    diaChi: data.diaChi,
                    email: data.email,
                })
                resolve({
                    errCode: 0,
                    message: "Cập nhật khách hàng thành công!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Không tìm thấy khách hàng!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


//XÓA KHÁCH HÀNG
let deleteKhachHang = (sdt) => {
    return new Promise(async (resolve, reject) => {
        try {
            let khachHang = await db.KhachHang.findOne({
                where: { sdt: sdt },
                raw: false
            })

            if (khachHang) {
                if (khachHang.tienNo == 0) {
                    await khachHang.destroy()
                    resolve({
                        errCode: 0,
                        message: "Xóa khách hàng thành công!"
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        message: "Không thể xóa khách hàng vì còn nợ!"
                    })
                }
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Khách hàng không tồn tại!"
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    getDSKhachHang,
    searchKhachHang,
    createKhachHang,
    editKhachHang,
    deleteKhachHang,
}