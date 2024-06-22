import axios from "../axios"

//LẤY DANH SÁCH PHIẾU NHẬP
const getDSPhieuNhap = () => {
    return axios.get('/get-ds-phieunhap')
}


//XEM CHI TIẾT PHIẾU NHẬP
const getCTPN = (idPN) => {
    return axios.get('/get-chitietphieunhap', {
        params: {
            idPN: idPN
        }
    })
}

//CHECK CHI TIẾT PHIẾU NHẬP
const checkCTPN = (data) => {
    return axios.post('/check-chitietphieunhap', data)
}


//THÊM PHIẾU NHẬP MỚI
const createPhieuNhap = (data) => {
    return axios.post('/create-phieunhap', data)
}


//TÌM KIẾM PHIẾU NHẬP
const searchPhieuNhap = (keyword) => {
    return axios.get('/search-phieunhap',{
        params:{
            keyword: keyword
        }
    })
}

export {
    getDSPhieuNhap,
    getCTPN,
    searchPhieuNhap,
    checkCTPN,
    createPhieuNhap
}

