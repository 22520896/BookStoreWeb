const { json } = require("sequelize")

baoCaoService = require("../services/baoCaoService")

//XUẤT BÁO CÁO
let handleGetBaoCao = async (req, res) => {
    let type = req.query.type
    let month = Number(req.query.month)
    let year = Number(req.query.year)
    if(!type || !month || !year){
        return res.status(500).json({
            errCode: 1,
            message: 'Vui lòng nhập đầy đủ thông tin!'
        })
    }
    let now = new Date()
    if (year > now.getFullYear() || (year == now.getFullYear() && month >= now.getMonth()+1)){                
        return res.status(200).json({
            errCode: 2,
            message: "Năm Tháng không hợp lệ!"
        })
    }

    let baoCao = {
        loai: type,
        thang: month,
        nam: year,
    }

    if (type == 'ton'){
        baoCao.baoCao = await baoCaoService.getBaoCaoTon(month, year);
    }
    else if (type == 'congNo'){
        baoCao.baoCao = await baoCaoService.getBaoCaoCongNo(month, year);
    }    
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        baoCao
    })
}

module.exports = {
    handleGetBaoCao,
}