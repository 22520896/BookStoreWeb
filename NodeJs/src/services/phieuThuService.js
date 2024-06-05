const db = require('../models/index');

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

module.exports = {
    getDSPhieuThu,       
}