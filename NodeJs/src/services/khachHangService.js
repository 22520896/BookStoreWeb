const db = require('../models/index');

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

module.exports = {
    getDSKhachHang,       
}