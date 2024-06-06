const db = require('../models/index');

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
            let sach = await db.Sach.findOne({
                where: { tenSach: data.sach },
            })
            if (data.soLuong < process.env.MIN_SLNHAP) {
                resolve({
                    errCode: 1,
                    message: `Số lượng nhập ít nhất là ${process.env.MIN_SLNHAP}!`
                })
            }
            else {
                if (sach) {
                    if (sach.soLuong >= process.env.MAX_SLTON_TRUOC_NHAP) {
                        resolve({
                            errCode: 2,
                            message: `Số lượng tồn của sách này là ${sach.soLuong}, chỉ được nhập sách có lượng tồn ít hơn ${process.env.MIN_SLTON}!`
                        })
                    }
                    else {
                        resolve(
                            {
                                errCode: 0,
                                message: 'OK',
                                sach
                            }
                        )
                    }
                }
                else (!sach)
                {
                    if (data.tacGia && data.theLoai && data.donGiaNhap) {
                        resolve({
                            errCode: 4,
                            message: 'Bạn vừa nhập 1 loại sách mới!'
                        })
                    }
                    else {
                        resolve({
                            errCode: 5,
                            message: 'Sách này không tồn tại trong kho. Vui lòng nhập đầy đủ thông tin!'
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
                    where: { idSach: ct.idSach },
                    raw: false
                })

                if (!sach) {
                    //Thêm sách mới
                    sach = await db.Sach.create({
                        tenSach: ct.sach,
                        tacGia: ct.tacGia,
                        theLoai: ct.theLoai,
                        soLuong: ct.soLuong,
                        donGiaBan: ct.donGiaNhap * process.env.DG_BAN,
                    })

                    //Cập nhật TonSach
                    await db.tonSach.create({
                        idSach: sach.idSach,
                        thang: thangLap,
                        nam: namLap,
                        tonDau: 0,
                        phatSinh: ct.soLuong,
                    })
                }
                else {
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
                            phatSinh: tonSach.phatSinh + ct.soLuong,
                        })
                    }

                    else {
                        await db.tonSach.create({
                            idSach: ct.idSach,
                            thang: thangLap,
                            nam: namLap,
                            tonDau: sach.soLuong,
                            phatSinh: ct.soLuong,
                        })
                    }

                    //Cập nhật sách 
                    await sach.update({
                        soLuong: sach.soLuong + ct.soLuong,
                        donGiaBan: ct.donGiaNhap * process.env.DG_BAN
                    })

                }

                await db.CTPN.create({
                    idPN: phieuNhap.idPN,
                    idSach: sach.idSach,
                    sach: ct.sach,
                    theLoai: ct.theLoai,
                    tacGia: ct.tacGia,
                    soLuong: ct.soLuong,
                    donGiaNhap: ct.donGiaNhap
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
let searchPhieuNhap = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let DSPhieuNhap = await db.PhieuNhap.findAll({
                where: { ngayLap: keyword }
            })
            data = {}

            if (DSPhieuNhap.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.DSPhieuNhap = DSPhieuNhap
            }
            else {
                data.errCode = 2
                data.message = `Không tìm thấy phiếu nhập được lập vào ngày ${keyword}!`
                data.DSPhieuNhap = []
            }
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    getDSPhieuNhap,
    getCTPN,
    searchPhieuNhap,
    checkCTPN,
    createPhieuNhap
}