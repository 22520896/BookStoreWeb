const db = require('../models/index');
const { Sequelize, Op } = require('sequelize')

//XUẤT BÁO CÁO TỒN
let getBaoCaoTon = (month, year) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let DSSach = await db.Sach.findAll({})
            let baoCao = []
            let ton 
            for (let sach of DSSach){
                ton = await db.TonSach.findOne({
                    where: {
                        idSach: sach.idSach,
                        thang: month,
                        nam: year
                    },
                })
                if (ton){
                    baoCao.push({
                        tenSach: sach.tenSach,
                        tonDau: ton.tonDau,
                        phatSinh: ton.phatSinh,
                        tonCuoi: ton.tonDau + ton.phatSinh
                    })
                }
                else{
                    baoCao.push({
                        tenSach: sach.tenSach,
                        tonDau: sach.soLuong,
                        phatSinh: 0,
                        tonCuoi: sach.soLuong
                    })
                }
            }
            resolve (baoCao)
        } catch (e) {
            reject(e)
        }
    })
}


//XUẤT BÁO CÁO CÔNG NỢ
let getBaoCaoCongNo = (month, year) =>{
    return new Promise(async (resolve, reject) => {
        try {
            let DSKhachHang = await db.KhachHang.findAll({})
            let baoCao = []
            let congNo 
            for (let khachHang of DSKhachHang){
                congNo = await db.CongNo.findOne({
                    where: {
                        sdt: khachHang.sdt,
                        thang: month,
                        nam: year
                    }
                })

                if (congNo){
                    baoCao.push({
                        hoTen: khachHang.ten,
                        noDau: congNo.noDau,
                        phatSinh: congNo.phatSinh,
                        noCuoi: congNo.noDau + congNo.phatSinh
                    })
                }
                else{
                    baoCao.push({
                        hoTen: khachHang.ten,
                        noDau: khachHang.tienNo,
                        phatSinh: 0,
                        noCuoi: khachHang.tienNo
                    })
                }
            }
            resolve (baoCao)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getBaoCaoTon,
    getBaoCaoCongNo
}