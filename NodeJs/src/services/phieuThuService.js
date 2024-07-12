const db = require('../models/index');
const { Op } = require('sequelize')

//LẤY DANH SÁCH PHIẾU THU
let getDSPhieuThu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let DSPhieuThu = await db.PhieuThu.findAll()
            resolve(DSPhieuThu)
        } catch (e) {
            reject(e)
        }
    })
}

//TÌM KIẾM PHIẾU THU
let searchPhieuThu = (type, keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DSPhieuThu = ""
            if (type == 'ngayThuTien') {
                DSPhieuThu = await db.PhieuThu.findAll({
                    where: {
                        ngayThuTien: {
                            [Op.eq]: new Date(keyword)
                        }
                    }
                })
            }
            else {
                DSPhieuThu = await db.PhieuThu.findAll({
                    where: {
                        [type]: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
            }
            data = {}

            if (DSPhieuThu.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.DSPhieuThu = DSPhieuThu
            }
            else {
                data.errCode = 2
                data.message = `Không tìm thấy phiếu thu có thông tin khớp với từ khóa!`
                data.DSPhieuThu = []
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}
//CHECK CHI TIẾT PHIẾU THU 
let checkCTPT = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let khachHang = await db.KhachHang.findOne({
                where: { sdt: data.sdt },
            })
            if (khachHang) {
                if (process.env.CHECK_TIEN_THU == 'true' && Number(data.soTienThu) > khachHang.tienNo) {
                    resolve({
                        errCode: 2,
                        message: `Khách hàng đang nợ ${khachHang.tienNo}, số tiền thu không được vượt quá số tiền khách nợ!`
                    })
                }

                else {
                    resolve({
                        errCode: 0,
                        message: `OK`,
                        khachHang
                    })
                }
            }
            else {
                resolve({
                    errCode: 3,
                    message: 'Khách hàng này chưa đăng kí thành viên!',
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

//LẤY CHI TIẾT PHIẾU THU
let getCTPT = (idPT) => {
    return new Promise(async (resolve, reject) => {
        try {
            let PT = await db.PhieuThu.findOne({
                where: { idPT: idPT },
                raw: false
            })

            data = {}
            if (PT) {
                data.errCode = 0
                data.message = 'OK'
                data.PT = PT
            }
            else {
                data.errCode = 2
                data.message = 'Không tìm thấy phiếu thu!'
                data.PT = {}
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}

//THÊM PHIẾU THU MỚI
let createPhieuThu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            ngay = new Date(data.ngayThuTien)
            let thangThu = ngay.getMonth() + 1
            let namThu = ngay.getFullYear()

            let khachHang = await db.KhachHang.findOne({
                where: {
                    sdt: data.sdt,
                },
                raw: false
            })

            //Cập nhật CongNo
            let congNo = await db.CongNo.findOne({
                where: {
                    sdt: data.sdt,
                    thang: thangThu,
                    nam: namThu
                },
                raw: false
            })
            if (congNo) {
                await congNo.update({
                    phatSinh: congNo.phatSinh - Number(data.soTienThu),
                })
            }
            else {
                await db.CongNo.create({
                    sdt: khachHang.sdt,
                    thang: thangThu,
                    nam: namThu,
                    noDau: khachHang.tienNo,
                    phatSinh: - Number(data.soTienThu),
                })
            }

            //Cập nhật KhachHang
            await khachHang.update({
                tienNo: khachHang.tienNo - Number(data.soTienThu)
            })

            //Thêm phiếu thu
            await db.PhieuThu.create({
                sdt: data.sdt,
                hoTen: data.hoTen,
                email: data.email,
                diaChi: data.diaChi,
                soTienThu: Number(data.soTienThu),
                ngayThuTien: data.ngayThuTien
            })

            resolve({
                errCode: 0,
                message: "Thêm phiếu thu thành công!"
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getDSPhieuThu,
    getCTPT,
    checkCTPT,
    searchPhieuThu,
    createPhieuThu
}

