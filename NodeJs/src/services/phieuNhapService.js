const db = require('../models/index');

//LẤY DANH SÁCH SÁCH
let getDSPhieuNhap = () => {
    return new Promise(async (resolve, reject) => {
        try {
            DSPhieuNhap = await db.PhieuNhap.findAll() 
            resolve(DSPhieuNhap)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getDSPhieuNhap,       
}