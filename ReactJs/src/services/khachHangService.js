import axios from "../axios"

//LẤY DANH SÁCH KHÁCH HÀNG
const getDSKhachHang = () => {
    return axios.get('/get-ds-khachhang')
}


//THÊM KHÁCH HÀNG MỚI
const createKhachHang = (data) => {
    return axios.post('/create-khachhang', data)
}


//CHỈNH SỬA KHÁCH HÀNG 
const editKhachHang = (data) => {
    return axios.put('/edit-khachhang', data)
}


//XÓA KHÁCH HÀNG
const deleteKhachHang = (sdt) => {
    return axios.delete('/delete-khachhang', {
        data: {
            sdt: sdt
        }
    })
}


//TÌM KIẾM KHÁCH HÀNG
const searchKhachHang = (type, keyword) => {
    return axios.get('/search-khachhang',{
        params:{
            type: type,
            keyword: keyword
        }
    })
}

export default{
    getDSKhachHang,
    searchKhachHang,
    createKhachHang,
    editKhachHang,
    deleteKhachHang,
}

