import { defaults } from "lodash"
import axios from "../axios"

//LOGIN
const handleLogin = (username, password) => {
    return axios.post("/login", {
        username: username,
        password: password,
    })
}


//LẤY DANH SÁCH TÀI KHOẢN
const getDSTaiKhoan = () => {
    return axios.get('/get-ds-taikhoan')
}


//THÊM TÀI KHOẢN MỚI
const createTaiKhoan = (data) => {
    return axios.post('/create-taikhoan', data)
}


//CHỈNH SỬA TÀI KHOẢN 
const editTaiKhoan = (data) => {
    return axios.put('/edit-taikhoan', data)
}


//XÓA TÀI KHOẢN
const deleteTaiKhoan = (idTK) => {
    return axios.delete('/delete-taikhoan', {
        data: {
            idTK: idTK
        }
    })
}


//TÌM KIẾM TÀI KHOẢN
const searchTaiKhoan = (type, keyword) => {
    return axios.get('/search-taikhoan',{
        params:{
            type: type,
            keyword: keyword
        }
    })
}

export default {
    handleLogin,
    getDSTaiKhoan,
    searchTaiKhoan,
    createTaiKhoan,
    editTaiKhoan,
    deleteTaiKhoan,
}

