const { where } = require('sequelize');
const db = require('../models/index');

//LẤY DANH SÁCH PHIẾU NHẬP
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

//LẤY CHI TIẾT PHIẾU NHẬP
let getCTPN = (idPN) => {
    return new Promise(async (resolve, reject) => {
        try {
            CTPN = await db.CTPN.findAll({
                where: { idPN: idPN }
            })

            data = {}
            if (CTPN.length != 0)
            {
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
        } catch (e)
        {
            reject(e)
        }
    })
}

//THÊM CHI TIẾT PHIẾU NHẬP MỚI
let checkCTPN = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sach = await db.Sach.findOne({
                where: { tenSach:data.sach  },
            })
            if (data.soLuong < process.env.MIN_SLNHAP) {
                resolve({
                    errCode: 1,
                    message: `Số lượng nhập phải lớn hơn ${process.env.MIN_SLNHAP}!`
                })
            }
            else {
                if (sach) {
                    if (sach.soLuong > process.env.MIN_SLTON) {
                    
                        resolve({
                            errCode: 2,
                            message: `Số lượng tồn sách lớn hơn ${process.env.MIN_SLTON} nên không được nhập. Vui lòng nhập sách khác!`
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
                    if (data.tacGia && data.theLoai && data.donGiaNhap)
                    {
                        resolve({
                            errCode: 4,
                            message: 'Bạn vừa nhập 1 sách mới!'
                        })
                    }
                    else
                    {
                        resolve({
                            errCode: 5,
                            message: 'Sách không tồn tại trong kho. Vui lòng nhập đầy đủ thông tin!'
                        })
                        }
                    
                }
            }

        }
        catch (e)
        {reject(e)}
    })
}
let searchPhieuNhap = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            DSPhieuNhap = await db.PhieuNhap.findAll({
                where: {ngayLap: keyword}
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
        }catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    getDSPhieuNhap,
    getCTPN,
    searchPhieuNhap,
    checkCTPN,
    //createPN
}