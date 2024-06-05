const db = require('../models/index');

//LẤY DANH SÁCH SÁCH
let getDSSach = () => {
    return new Promise(async (resolve, reject) => {
        try {
            DSSach = await db.Sach.findAll() 
            resolve(DSSach)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getDSSach,
        
}