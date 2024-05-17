import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUser } from '../../services/userService';
import ModalUser from './ModalUser';
import { chain } from 'lodash';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() { //Gán giá trị cho biến state -> Gọi API
        await this.getAllUsers()
    }

    getAllUsers = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => { //open/close modal
        this.setState(
            { isOpenModalUser: true }
        )
    }

    toggleUserModal = () => {
        this.setState(
            { isOpenModalUser: !this.state.isOpenModalUser }
        )
    }

    addNewUser = async (data) => {
        try {
            let response = await createNewUser(data)
            if (response && response.errCode === 0) {
                await this.getAllUsers()
                this.setState({
                    isOpenModalUser: false
                })
            } else {
                alert(response.message)
            }

        } catch (e) {
            console.log(e)
        }



    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <div className="title text-center">Quản Lí Tài Khoản</div>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    addNewUser={this.addNewUser}
                />
                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.handleAddNewUser()}><i className='fas fa-plus'></i> Thêm Tài Khoản</button>
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
                                            <td>{item.std}</td>
                                            <td>{item.diaChi}</td>
                                            <td>{item.vaiTro}</td>
                                            <td>
                                                <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                                <button className='btn-del'><i class="fas fa-trash"></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
