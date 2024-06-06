const db = require('../models/index');
const { Op } = require('sequelize')

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


//TÌM KIẾM SÁCH
let searchSach = (type,keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            DSSach = await db.Sach.findAll({
                where: {
                    [type]: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
            data = {}

            if (DSSach.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.DSSach = DSSach
            }
            else {
                data.errCode = 2
                data.message = 'Không tìm thấy sách có thông tin khớp với từ khóa!'
                data.DSSach = []
            }
            resolve(data)
        }catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getDSSach,
    searchSach,        
}