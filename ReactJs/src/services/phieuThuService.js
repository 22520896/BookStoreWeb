import axios from "../axios"

//LẤY DANH SÁCH PHIẾU THU
const getDSPhieuThu = () => {
    return axios.get('/get-ds-phieuthu')
}


//XEM CHI TIẾT PHIẾU THU
const getCTPT = (idPT) => {
    return axios.get('/get-chitietphieuthu', {
        params: {
            idPT: idPT
        }
    })
}

//CHECK CHI TIẾT PHIẾU THU
const checkCTPT = (data) => {
    return axios.post('/check-chitietphieuthu', data)
}


//THÊM PHIẾU THU MỚI
const createPhieuThu = (data) => {
    return axios.post('/create-phieuthu', data)
}


//TÌM KIẾM PHIẾU THU
const searchPhieuThu = (type, keyword) => {
    return axios.get('/search-phieuthu',{
        params:{
            type: type,
            keyword: keyword
        }
    })
}

export {
    getDSPhieuThu,
    getCTPT,
    checkCTPT,
    searchPhieuThu,
    createPhieuThu
}

