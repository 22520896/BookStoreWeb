sachService = require("../services/sachService")

//LẤY DANH SÁCH SÁCH
handleGetDSSach = async (req, res) => {
    let DSSach = await sachService.getDSSach();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSSach
    })
}

module.exports = {
    handleGetDSSach
}