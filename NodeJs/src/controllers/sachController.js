sachService = require("../services/sachService")

//LẤY DANH SÁCH SÁCH
let handleGetDSSach = async (req, res) => {
    let DSSach = await sachService.getDSSach();
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        DSSach
    })
}


//TÌM KIẾM SÁCH 
let handleSearchSach = async (req, res) => {
    let type = req.body.type
    let keyword = req.body.keyword
    if (!type) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng chọn mục tìm kiếm!"
        })
    }
    if (!keyword) {
        return res.status(500).json({
            errCode: 1,
            message: "Vui lòng nhập từ khóa tìm kiếm!"
        })
    }
    let data = await sachService.searchSach(type, keyword)
    return res.status(200).json(data)
}

module.exports = {
    handleGetDSSach,
    handleSearchSach,
}