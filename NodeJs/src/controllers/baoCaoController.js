baoCaoService = require("../services/baoCaoService")

//XUẤT BÁO CÁO
handleGetBaoCao = async (req, res) => {
    let type = req.body.type
    let month = req.body.month
    let year = req.body.year
    if(!type || !month || !year){
        return res.status(500).json({
            errCode: 1,
            message: 'Vui lòng nhập đầy đủ thông tin!'
        })
    }

    let now = new Date()
    if (year > now.getFullYear() || (year == now.getFullYear() && month >= now.getMonth()+1)){                
        return res.status(200)({
            errCode: 2,
            message: "Năm hoặc tháng không hợp lệ!"
        })
    }

    let baoCao = []

    if (type == 'ton'){
        baoCao = await sachService.getBaoCaoTon(month, year);
    }
    else if (type == 'congNo'){
        baoCao = await sachService.getBaoCaoCongNo(month, year);
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