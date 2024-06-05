const db = require('../models/index');

//LẤY DANH SÁCH BÁO CÁO
let getBaoCao = () => {
    return new Promise(async (resolve, reject) => {
        try {
            baoCao = await db.BaoCao.findAll() 
            resolve(baoCao)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getBaoCao,       
}