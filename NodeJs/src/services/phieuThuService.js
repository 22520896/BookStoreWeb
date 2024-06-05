const db = require('../models/index');
const { Op } = require('sequelize')
//LẤY DANH SÁCH PHIẾU THU
let getDSPhieuThu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            DSPhieuThu = await db.PhieuThu.findAll() 
            resolve(DSPhieuThu)
        } catch (e) {
            reject(e)
        }
    })
}

//TÌM KIẾM PHIẾU THU
let searchPhieuThu = (type,keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            DSPhieuThu = await db.PhieuThu.findAll({
                where: {
                    [type]: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
            data = {}

            if (DSPhieuThu.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.DSPhieuThu = DSPhieuThu
            }
            else {
                data.errCode = 2
                data.message = `Không tìm thấy phiếu thu!`
                data.DSPhieuThu = []
            }
            resolve(data)
        }catch (e) {
            reject(e)
        }
    })
}

//LẤY CHI TIẾT PHIẾU THU
let getCTPT = (idPT) => {
    return new Promise(async (resolve, reject) => {
        try {
            let CTPT = await db.PhieuThu.findOne({
                where: { idPT: idPT },
                raw: false
            })

            data = {}
            if (CTPT)
            {
                data.errCode = 0
                data.message = 'OK'
                data.CTPT = CTPT
            }
            else {
                data.errCode = 2
                data.message = 'Không tìm thấy phiếu thu!'
                data.CTPT = []
            }
            resolve(data)
        } catch (e)
        {
            reject(e)
        }
    })
}

//THÊM PHIẾU THU MỚI
let createPhieuThu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            check = await checkidPT(data.idPT)
            if (!check) {
                await db.PhieuThu.create({
                    idPT: data.idPT,
                    idKH: data.idKH,
                    sdt: data.sdt,
                    hoTen: data.hoTen,
                    email: data.email,
                    soTienThu: data.soTienThu,
                    ngayThuTien: data.ngayThuTien
                })
                resolve({
                    errCode: 0,
                    message: "Thêm phiếu thu mới thành công!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Phiếu thu đã tồn tại, vui lòng nhập lại phiếu thu khác!"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getDSPhieuThu,
    getCTPT,
    searchPhieuThu
}