const db = require('../models/index');
const { Op } = require('sequelize')

//LẤY DANH SÁCH PHIẾU NHẬP
let getDSPhieuNhap = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let DSPhieuNhap = await db.PhieuNhap.findAll()
            resolve(DSPhieuNhap)
        } catch (e) {
            reject(e)
        }
    })
}


//LẤY CHI TIẾT PHIẾU NHẬP
let getCTPN = (idPN) => {
    return new Promise(async (resolve, reject) => {
        try {
            let CTPN = await db.CTPN.findAll({
                where: { idPN: idPN }
            })

            data = {}
            if (CTPN.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.CTPN = CTPN
            }
            else {
                data.errCode = 2
                data.message = 'Không tìm thấy phiếu nhập!'
                data.CTPN = []
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}


//CHECK CHI TIẾT PHIẾU NHẬP MỚI
let checkCTPN = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let soLuong = Number(data.soLuong)
            if (soLuong < process.env.MIN_SLNHAP) {
                resolve({
                    errCode: 2,
                    message: `Số lượng nhập ít nhất là ${process.env.MIN_SLNHAP}!`
                })
            }
            else {
                let sach = await db.Sach.findOne({
                    where: { tenSach: data.sach },
                })
                if (sach) {
                    if (sach.soLuong >= process.env.MAX_SLTON_TRUOC_NHAP) {
                        resolve({
                            errCode: 3,
                            message: `Số lượng tồn của sách này là ${sach.soLuong}, chỉ được nhập sách có lượng tồn ít hơn ${process.env.MAX_SLTON_TRUOC_NHAP}!`
                        })
                    }
                    else {
                        resolve(
                            {
                                errCode: 0,
                                message: 'OK',

                            }
                        )
                    }
                }
                else (!sach)
                {
                    if (data.tacGia && data.theLoai && data.donGiaNhap) {
                        resolve({
                            errCode: 0,
                            message: 'Bạn vừa nhập 1 loại sách mới!'
                        })
                    }
                    else {
                        resolve({
                            errCode: 4,
                            message: `Sách ${data.sach} không tồn tại trong kho. Vui lòng nhập đầy đủ thông tin!`
                        })
                    }
                }
            }
        }
        catch (e) { reject(e) }
    })
}


//THÊM PHIẾU NHẬP MỚI
let createPhieuNhap = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let phieuNhap = await db.PhieuNhap.create({
                ngayLap: data.ngayLap,
            })

            ngay = new Date(data.ngayLap)
            let thangLap = ngay.getMonth() + 1
            let namLap = ngay.getFullYear()

            for (let ct of data.CTPN) {
                let sach = await db.Sach.findOne({
                    where: { tenSach: ct.sach },
                    raw: false
                })

                if (!sach) {
                    //Thêm sách mới
                    sach = await db.Sach.create({
                        tenSach: ct.sach,
                        tacGia: ct.tacGia,
                        theLoai: ct.theLoai,
                        soLuong: Number(ct.soLuong),
                        donGiaBan: Number(ct.donGiaNhap) * process.env.DG_BAN,
                    })

                    //Cập nhật TonSach
                    await db.TonSach.create({
                        idSach: sach.idSach,
                        thang: thangLap,
                        nam: namLap,
                        tonDau: 0,
                        phatSinh: Number(ct.soLuong),
                    })
                }
                else {
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
                            phatSinh: tonSach.phatSinh + Number(ct.soLuong),
                        })
                    }

                    else {
                        await db.TonSach.create({
                            idSach: sach.idSach,
                            thang: thangLap,
                            nam: namLap,
                            tonDau: sach.soLuong,
                            phatSinh: Number(ct.soLuong),
                        })
                    }

                    //Cập nhật sách 
                    await sach.update({
                        soLuong: sach.soLuong + Number(ct.soLuong),
                        donGiaBan: Number(ct.donGiaNhap) * process.env.DG_BAN
                    })
                }

                await db.CTPN.create({
                    idPN: phieuNhap.idPN,
                    idSach: sach.idSach,
                    sach: ct.sach,
                    theLoai: ct.theLoai,
                    tacGia: ct.tacGia,
                    soLuong: Number(ct.soLuong),
                    donGiaNhap: Number(ct.donGiaNhap)
                })
            }

            resolve({
                errCode: 0,
                message: "Thêm phiếu nhập thành công!"
            })
        }
        catch (e) {
            reject(e)
        }
    })
}


//TÌM KIẾN PHIẾU NHẬP
let searchPhieuNhap = (type, keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DSPhieuNhap = ""
            if (type == 'ngayLap') {
                DSPhieuNhap = await db.PhieuNhap.findAll({
                    where: {
                        ngayLap: {
                            [Op.eq]: new Date(keyword)
                        }
                    }
                })
            }
            else {
                DSPhieuNhap = await db.PhieuNhap.findAll({
                    where: {
                        [type]: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                })
            }
            data = {}

            if (DSPhieuNhap.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.DSPhieuNhap = DSPhieuNhap
            }
            else {
                data.errCode = 2
                data.message = `Không tìm thấy phiếu nhập có thông tin khớp với từ khóa!`
                data.DSPhieuNhap = []
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}


//THAM CHIẾU SÁCH
let referSach = (tenSach) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sach = await db.Sach.findOne({
                where: { tenSach: tenSach },
            })
            if (sach) {
                if (sach.soLuong >= process.env.MAX_SLTON_TRUOC_NHAP) {
                    resolve({
                        errCode: 2,
                        message: `Số lượng tồn của sách này là ${sach.soLuong}, chỉ được nhập sách có lượng tồn ít hơn ${process.env.MAX_SLTON_TRUOC_NHAP}!`
                    })
                }
                else {
                    let ct = {
                        sach: sach.tenSach,
                        theLoai: sach.theLoai,
                        tacGia: sach.tacGia,
                        donGiaNhap: sach.donGiaBan / process.env.DG_BAN
                    }
                    resolve(
                        {
                            errCode: 0,
                            message: 'OK',
                            ct
                        })
                }
            }
            else {
                resolve({
                    errCode: 3,
                    message: `Sách ${tenSach} không tồn tại trong kho. Vui lòng nhập đầy đủ thông tin!`
                })
            }
        }
        catch (e) { reject(e) }
    })
}

module.exports = {
    getDSPhieuNhap,
    getCTPN,
    searchPhieuNhap,
    checkCTPN,
    createPhieuNhap,
    referSach
}