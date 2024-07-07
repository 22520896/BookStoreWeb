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
                if (sach.soLuong - Number(data.soLuong) < process.env.MIN_SL_SAU_BAN) {
                    resolve({
                        errCode: 2,
                        message: `Hiện số lượng tồn của sách này là ${data.soLuong}. Số lượng tồn sách sau khi bán phải ít nhất là ${process.env.MIN_SL_SAU_BAN} nên không bán sách này!`
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        ct: {
                            sach: sach.tenSach,
                            theLoai: sach.theLoai,
                            donGiaBan: sach.donGiaBan,
                            soLuong: data.soLuong,
                            thanhTien: Number(data.soLuong) * sach.donGiaBan
                        }
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
                if (khachHang.tienNo > process.env.MAX_NO) {
                    resolve({
                        errCode: 1,
                        message: `Không thể bán vì khách hàng này đang nợ quá ${process.env.MAX_NO}!`
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        message: 'OK',
                        hoTen: khachHang.ten
                    })
                }
            }
            else {
                if (Number(data.no) > 0)
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
                tongTien: Number(data.tongTien),
                soTienTra: Number(data.soTienTra),
                tienTraLai: Number(data.tienTraLai),
                no: Number(data.no)
            })
            ngay = new Date(data.ngayLap)
            let thangLap = ngay.getMonth() + 1
            let namLap = ngay.getFullYear()

            for (let ct of data.CTHD) {
                let sach = await db.Sach.findOne({
                    where: { tenSach: ct.sach },
                    raw: false
                })

                //Cập nhật TonSach
                let tonSach = await db.TonSach.findOne({
                    where: {
                        idSach: sach.idSach,
                        thang: thangLap,
                        nam: namLap
                    },
                    raw: false
                })

                if (tonSach) {
                    await tonSach.update({
                        phatSinh: tonSach.phatSinh - Number(ct.soLuong)
                    })
                }
                else {
                    await db.TonSach.create({
                        idSach: sach.idSach,
                        thang: thangLap,
                        nam: namLap,
                        tonDau: sach.soLuong,
                        phatSinh: - Number(ct.soLuong),
                    })
                }

                //Cập nhật Sach
                await sach.update({
                    soLuong: sach.soLuong - Number(ct.soLuong)
                })

                await db.CTHD.create({
                    idHD: hoaDon.idHD,
                    idSach: sach.idSach,
                    sach: ct.sach,
                    theLoai: ct.theLoai,
                    soLuong: Number(ct.soLuong),
                    donGiaBan: Number(ct.donGiaBan)
                })

            }

            if (hoaDon.no > 0) {
                let khachHang = await db.KhachHang.findOne({
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
                    await congNo.update({
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
                await khachHang.update({
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
let searchHoaDon = (type, keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DSHoaDon = ""
            if (type == 'ngayLap') {
                DSHoaDon = await db.HoaDon.findAll({
                    where: {
                        ngayLap: {
                            [Op.eq]: new Date(keyword)
                        }
                    }
                })
            }
            else {
                DSHoaDon = await db.HoaDon.findAll({
                    where: {
                        [type]: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
            }
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
        } catch (e) {
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