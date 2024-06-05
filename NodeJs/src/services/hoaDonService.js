const db = require('../models/index');
const { Op } = require('sequelize')

let searchHoaDon = (type,keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            DSHoaDon = await db.HoaDon.findAll({
                where: {
                    [type]: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            })
            data = {}

            if (DSHoaDon.length != 0) {
                data.errCode = 0
                data.message = 'OK'
                data.DSHoaDon = DSHoaDon
            }
            else {
                data.errCode = 2
                data.message = `Không tìm thấy hóa đơn!`
                data.DSHoaDon = []
            }
            resolve(data)
        }catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    searchHoaDon,
   
}