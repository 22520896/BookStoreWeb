const db = require('../models/index');
const { Op } = require('sequelize')

//LẤY DANH SÁCH HÓA ĐƠN
let getDSHoaDon = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let DSHoaDon = await db.HoaDon.findAll()
            resolve(DSHoaDon)
        } catch (e) {
            reject(e)
        }
    })
}

//XEM CHI TIẾT HÓA ĐƠN
let getCTHD = (idHD) => {
    return new Promise(async (resolve, reject) => {
        try {
            let CTHD = await db.CTHD.findAll({
                where: { idHD: idHD }
            })

            data = {}

            if (CTHD.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.CTHD = CTHD
            }
            else {
                data.errCode = 1
                data.message = 'Không tìm thấy hóa đơn'
                data.CTHD = []
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}

//CHECK CHI TIẾT HÓA ĐƠN
let checkCTHD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sach = await db.Sach.findOne({
                where: { tenSach: data.sach },
            })
            if (sach) {
                if (sach.soLuong - data.soLuong < process.env.MIN_SL_SAU_BAN) {
                    resolve({
                        errCode: 2,
                        message: `Hiện số lượng tồn của sách này là ${data.soLuong}. Số lượng tồn sách sau khi bán phải ít nhất là ${process.env.MIN_SL_SAU_BAN} nên không bán sách này!`
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        sach
                    })
                }
            }
            else {
                resolve({
                    errCode: 3,
                    message: 'Sách không tồn tại trong kho!'
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

//CHECK KHÁCH HÀNG    
let checkKhachHang = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let khachHang = await db.KhachHang.findOne({
                where: { sdt: data.sdt },
            })
            if (khachHang) {
                if (khachHang.tienNo + data.no > process.env.MAX_NO) {
                    resolve({
                        errCode: 1,
                        message: `Không thể bán cho khách hàng này vì sẽ nợ hơn ${process.env.MIN_SL_SAU_BAN}!`
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        hoTen: khachHang.hoTen
                    })
                }
            }
            else {
                if (data.no > 0)
                    resolve({
                        errCode: 2,
                        message: 'Khách hàng này chưa đăng kí thành viên nên không nợ được!'
                    })

                else {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        hoTen: ""
                    })
                }
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

//THÊM HÓA ĐƠN MỚI
let createHoaDon = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hoaDon = await db.HoaDon.create({
                ngayLap: data.ngayLap,
                sdt: data.sdt,
                hoTen: data.hoTen,
                tongTien: data.tongTien,
                soTienTra: data.soTienTra,
                tienTraLai: data.tienTraLai,
                no: data.no
            })
            ngay = new Date(data.ngayLap)
            let thangLap = ngay.getMonth() + 1
            let namLap = ngay.getFullYear()

            for (let ct of data.CTHD) {
                await db.CTHD.create({
                    idHD: hoaDon.idHD,
                    idSach: ct.idSach,
                    sach: ct.sach,
                    theLoai: ct.theLoai,
                    soLuong: ct.soLuong,
                    donGiaBan: ct.donGiaBan
                })

                let sach = await db.Sach.findOne({
                    where: { idSach: ct.idSach },
                    raw: false
                })

                //Cập nhật TonSach
                let tonSach = await db.TonSach.findOne({
                    where: {
                        idSach: ct.idSach,
                        thang: thangLap,
                        nam: namLap
                    },
                    raw: false
                })
                if (tonSach) {
                    await db.tonSach.update({
                        phatSinh: tonSach.phatSinh - ct.soLuong
                    })
                }
                else {
                    await db.tonSach.create({
                        idSach: ct.idSach,
                        thang: thangLap,
                        nam: namLap,
                        tonDau: sach.soLuong,
                        phatSinh: - ct.soLuong,
                    })
                }

                //Cập nhật Sach
                await sach.update({
                    soLuong: sach.soLuong - ct.soLuong
                })

            }

            if (hoaDon.no > 0) {
                let khachHang = await db.khachHang.findOne({
                    where: {
                        sdt: hoaDon.sdt,
                    },
                    raw: false
                })

                let congNo = await db.CongNo.findOne({
                    where: {
                        sdt: hoaDon.sdt,
                        thang: thangLap,
                        nam: namLap
                    },
                    raw: false
                })

                //Cập nhật CongNo
                if (congNo) {
                    await db.CongNo.update({
                        phatSinh: congNo.phatSinh + hoaDon.no,
                    })
                }
                else {
                    await db.CongNo.create({
                        sdt: hoaDon.sdt,
                        thang: thangLap,
                        nam: namLap,
                        noDau: khachHang.tienNo,
                        phatSinh: hoaDon.no,
                    })
                }

                //Cập nhật KhachHang
                await db.khachHang.update({
                    tienNo: khachHang.tienNo + hoaDon.no
                })
            }
            resolve({
                errCode: 0,
                message: "Thêm hóa đơn thành công!"
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

//TÌM KIẾM HÓA ĐƠN
let searchHoaDon = (type,keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            DSHoaDon = await db.HoaDon.findAll({
                where: {
                    [type]: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
            data = {}

            if (DSHoaDon.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.DSHoaDon = DSHoaDon
            }
            else {
                data.errCode = 2
                data.message = `Không tìm thấy hóa đơn!`
                data.DSHoaDon = []
            }
            resolve(data)
        }catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getDSHoaDon,
    getCTHD,
    checkCTHD,
    checkKhachHang,
    createHoaDon, 
    searchHoaDon
}