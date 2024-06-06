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
// let getBaoCaoTon = (year, month) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let soLuongNhap = await db.CTPN.findAll({
//                 attributes: [
//                     'sach',
//                     [Sequelize.fn('SUM', Sequelize.col('soLuong')), 'tongSoLuongNhap']
//                 ],
//                 include: [
//                     {
//                         model: PhieuNhap,
//                         where: {
//                             [Op.and]: [
//                                 Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('ngayLap')), month),
//                                 Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('ngayLap')), year),
//                             ],
//                         },
//                     }
//                 ],
//                 group: ['sach']
//             })

//             let soLuongBan = await db.CTHD.findAll({
//                 attributes: [
//                     'sach',
//                     [Sequelize.fn('SUM', Sequelize.col('soLuong')), 'tongSoLuongBan']
//                 ],
//                 include: [
//                     {
//                         model: HoaDon,
//                         where: {
//                             [Op.and]: [
//                                 Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('ngayLap')), month),
//                                 Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('ngayLap')), year),
//                             ],
//                         },
//                     }
//                 ],
//                 group: ['sach']
//             })

//             thangSau = newDate(year, month, 1) //Lấy ngày đầu tháng sau

//             let soLuongNhapSauThang = await db.CTPN.findAll({
//                 attributes: [
//                     'sach',
//                     [Sequelize.fn('SUM', Sequelize.col('soLuong')), 'tongSoLuongNhap']
//                 ],
//                 include: [
//                     {
//                         model: PhieuNhap,
//                         where: {
//                             [Op.gte]: thangSau
//                         },
//                     }
//                 ],
//                 group: ['sach']
//             })

//             let soLuongBanSauThang = await db.CTHD.findAll({
//                 attributes: [
//                     'sach',
//                     [Sequelize.fn('SUM', Sequelize.col('soLuong')), 'tongSoLuongBan']
//                 ],
//                 include: [
//                     {
//                         model: HoaDon,
//                         where: {
//                             [Op.gte]: thangSau
//                         },
//                     }
//                 ],
//                 group: ['sach']
//             })

//             let DSSach = await db.Sach.findAll()

//             let baoCao = []
//             let nhap, ban, nhapSau, banSau, tonDau, tonCuoi, phatSinh

//             for (let sach of DSSach) {
//                 nhap = soLuongNhap.find(item => item.sach === sach.tenSach)
//                 ban = soLuongBan.find(item => item.sach === sach.tenSach)
//                 nhapSau = soLuongNhapSauThang.find(item => item.sach === sach.tenSach)
//                 banSau = soLuongBanSauThang.find(item => item.sach === sach.tenSach)

//                 tonCuoi = sach.soLuong - (nhapSau?.tongSoLuongNhap || 0) + (banSau?.tongSoLuongBan || 0)
//                 phatSinh = (nhap?.tongSoLuongNhap || 0) - (ban?.tongSoLuongBan || 0)
//                 tonDau = tonCuoi - phatSinh

//                 baoCao.push({
//                     sach: sach.tenSach,
//                     tonDau,
//                     phatSinh,
//                     tonCuoi
//                 })
//             }
//             resolve(baoCao)

//         } catch (e) {
//             reject(e)
//         }
//     })
// }



module.exports = {
    getBaoCaoTon,
    getBaoCaoCongNo
}