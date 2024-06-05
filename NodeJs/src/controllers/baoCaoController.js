baoCaoService = require("../services/baoCaoService")

//LẤY BÁO CÁO
handleGetBaoCao = async (req, res) => {
    let baoCao = await sachService.getBaoCao();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        baoCao
    })
}

module.exports = {
    handleGetBaoCao,
}