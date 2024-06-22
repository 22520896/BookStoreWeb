import axios from "../axios"

//XUẤT BÁO CÁO
const getBaoCao = (month, year, type) => {
    return axios.get('/get-baocao', {
        params: {
            month: month,
            year: year,
            type: type
        }
    })
}

export {
    getBaoCao
}

