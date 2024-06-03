import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './User.scss'
import { getAllUsers, createNewUser, deleteUser, editUser } from '../../services/userService';
import ModalCreateUser from './ModalCreateUser';
import ModalEditUser from "./ModalEditUser"
// import { chain } from 'lodash';
// import { emitter } from '../../utils/emitter'

class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalCreateUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() { //Gán giá trị cho biến state -> Gọi API
        await this.getAllUsers()
    }
    //-------------------------------------------------------------------------------------------------------
    getAllUsers = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    //-------------------------------------------------------------------------------------------------------
    handleCreateNewUser = () => { //open/close modal
        this.setState(
            { isOpenModalCreateUser: true }
        )
    }

    toggleModalCreateUser = () => {
        this.setState(
            { isOpenModalCreateUser: !this.state.isOpenModalCreateUser }
        )
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUser(data)
            if (!response || response.errCode === 0) {
                await this.getAllUsers()
                this.setState({
                    isOpenModalCreateUser: false
                })
            } else {
                alert(response.message)
            }
        } catch (e) {
            console.log(e)
        }
    }
    //-------------------------------------------------------------------------------------------------------
    toggleModalEditUser = () => {
        this.setState(
            { isOpenModalEditUser: !this.state.isOpenModalEditUser }
        )
    }

    handleEditUser = async (user) => {
        this.setState(
            {
                isOpenModalEditUser: true,
                userEdit: user
            }
        )
    }

    editUser = async (user) => {
        try {
            let response = await editUser(user)
            if (!response || response.errCode === 0) {
                await this.getAllUsers()
                this.setState({
                    isOpenModalEditUser: false
                })
            } else {
                alert(response.message)
            }
        } catch (e) {
            console.log(e)
        }
    }
    //-------------------------------------------------------------------------------------------------------
    // handleDeleteUser = async (id) => {
    //     try {
    //         let response = await deleteUser(id)
    //         if (response && response.errCode === 0) {
    //             await this.getAllUsers()
    //         } else {
    //             alert(response.message)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }




    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className="title text-center">Quản Lí Tài Khoản</div>
                <ModalCreateUser
                    isOpen={this.state.isOpenModalCreateUser}
                    toggleModalCreateUser={this.toggleModalCreateUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleModalEditUser={this.toggleModalEditUser}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />}
                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.handleCreateNewUser()}>
                        <i className='fas fa-plus'></i> Thêm Tài Khoản</button>

                </div>

                <div className='user-table mt-4 mx-3'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Username</th>
                                <th>Họ Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Vai Trò</th>
                                <th></th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.hoTen}</td>
                                            <td>{item.sdt}</td>
                                            <td>{item.diaChi}</td>
                                            <td>{item.vaiTro}</td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => this.handleEditUser(item)}><i class="fas fa-pencil-alt"></i></button>
                                                <button className='btn-del' />
                                                {/* onClick={() => this.handleDeleteUser(item.id)}><i class="fas fa-trash"></i></button> */}
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
