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
const searchPhieuNhap = (type, keyword) => {
    return axios.get('/search-phieunhap',{
        params:{
            type: type,
            keyword: keyword
        }
    })
}

//THAM CHIẾU SÁCH
const referSach = (sach) => {
    return axios.get('/refer-sach',{
        params:{
            sach: sach,
        }
    })
}

export default {
    getDSPhieuNhap,
    getCTPN,
    searchPhieuNhap,
    checkCTPN,
    createPhieuNhap,
    referSach    
}

