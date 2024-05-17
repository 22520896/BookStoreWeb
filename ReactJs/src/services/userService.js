import axios from "../axios"

const handleLoginApi = (username, password) => {
    return axios.post("/api/login", {
        username: username,
        password: password,

    })
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUser,
}