const db = require('../models/index')
const CRUDService = require('../services/createService')

const getHomepage = (req, res) => {
    //Xử lí data
    //Call model
    res.send('Difficult Time')
}

const getABC = async (req, res) => {
    try {
        let data = await db.TaiKhoan.findAll({
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt'] // Loại bỏ các trường không mong muốn
            }
        });
        console.log(data)
        res.render('sample.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}

const getCRUD = (req, res) => {
    res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('Post CRUD from server')
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => { //Gửi giao diện chỉnh sửa
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        return res.render("editCRUD.ejs", {
            user: userData
        })
    }
    else {
        return res.send("User not found!")
    }

}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}


let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteUserById(id)
        return res.send('Xóa tài khoản thành công!')
    }
    else {
        return res.send('Không tìm thấy tài khoản!')
    }
}
module.exports = {
    getHomepage, getABC, getCRUD, postCRUD, displayCRUD, getEditCRUD, putCRUD, deleteCRUD
}