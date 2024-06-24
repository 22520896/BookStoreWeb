import axios from "../axios"

//LẤY DANH SÁCH SÁCH
const getDSSach = () => {
    return axios.get('/get-ds-sach')
}

//TÌM KIẾM SÁCH
const searchSach = (type, keyword) => {
    return axios.get('/search-sach',{
        params:{
            type: type,
            keyword: keyword
        }
    })
}

export default{
    getDSSach,
    searchSach,
}

