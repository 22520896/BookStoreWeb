import axios from "../axios"

//LẤY DANH SÁCH HÓA ĐƠN
const getDSHoaDon = () => {
    return axios.get('/get-ds-hoadon')
}


//XEM CHI TIẾT HÓA ĐƠN
const getCTHD = (idHD) => {
    return axios.get('/get-chitiethoadon', {
        params: {
            idHD: idHD
        }
    })
}


//CHECK CHI TIẾT HÓA ĐƠN
const checkCTHD = (data) => {
    return axios.post('/check-chitiethoadon', data)
}


//CHECK KHÁCH HÀNG
const checkKhachHang = (data) => {
    return axios.post('/check-chitiethoadon', data)
}


//THÊM HÓA ĐƠN MỚI
const createHoaDon = (data) => {
    return axios.post('/create-hoadon', data)
}


//TÌM KIẾM HÓA ĐƠN
const searchHoaDon = (type, keyword) => {
    return axios.get('/search-hoadon',{
        params:{
            type: type,
            keyword: keyword
        }
    })
}

export {
    getDSHoaDon,
    getCTHD,
    checkCTHD,
    checkKhachHang,
    createHoaDon, 
    searchHoaDon
}

