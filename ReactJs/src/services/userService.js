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

const deleteUser = (id) => {
    return axios.delete('api/delete-user', {
        data: {
            id: id
        }
    })
}

const editUser = (user) => {
    return axios.put('api/edit-user', user)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser
}

