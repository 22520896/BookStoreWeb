import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TaiKhoan.scss'
import taiKhoanService from '../../services/taiKhoanService.js';
import ModalCreateTaiKhoan from './ModalCreateTaiKhoan';
import ModalEditTaiKhoan from "./ModalEditTaiKhoan"
import ModalDeleteTaiKhoan from "./ModalDeleteTaiKhoan"
import { toast } from 'react-toastify';
import { LuTrash2 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";


class TaiKhoan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DSTaiKhoan: [],
            isOpenModalCreateTaiKhoan: false,
            isOpenModalEditTaiKhoan: false,
            isOpenModalDeleteTaiKhoan: false,
            taiKhoanEdit: {},
            type: "",
            keyword: "",
            idDelete: ""
        }
    }

    async componentDidMount() { //Gán giá trị cho biến state -> Gọi API
        await this.getDSTaiKhoan()
    }

    thongBao = (errCode, message) => {
        let prop = {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            closeButton: false,
            className: 'custom-toast', // Thêm class tùy chỉnh
            bodyClassName: 'custom-toast-body' // Thêm class body tùy chỉnh
        }
        if (errCode === 0) {
            toast.success(message, prop)
        }
        else {
            toast.error(message, prop)
        }
    }


    handleOnChange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }


    //GỌI API LẤY DANH SÁCH TÀI KHOẢN
    getDSTaiKhoan = async () => {
        let response = await taiKhoanService.getDSTaiKhoan()
        if (response && response.errCode === 0) {
            this.setState({
                DSTaiKhoan: response.DSTaiKhoan
            })
        }
    }

    //------------------------------------------------------------------------
    //ĐÓNG/MỞ MODAL THÊM TÀI KHOẢN MỚI
    openCreateTaiKhoan = () => {
        this.setState(
            { isOpenModalCreateTaiKhoan: true }
        )
    }

    toggleModalCreateTaiKhoan = () => {
        this.setState(
            { isOpenModalCreateTaiKhoan: !this.state.isOpenModalCreateTaiKhoan }
        )
    }

    //GỌI API THÊM TÀI KHOẢN MỚI
    createTaiKhoan = async (data) => {
        try {
            let response = await taiKhoanService.createTaiKhoan(data)
            if (!response || response.errCode === 0) {
                await this.getDSTaiKhoan()
                this.setState({
                    isOpenModalCreateTaiKhoan: false
                })

            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }

    }
    //-------------------------------------------------------------------------------------------------------

    //ĐÓNG/MỞ MODAL CHỈNH SỬA TÀI KHOẢN
    openEditTaiKhoan = async (data) => {
        this.setState(
            {
                isOpenModalEditTaiKhoan: true,
                taiKhoanEdit: data
            }
        )
    }

    toggleModalEditTaiKhoan = () => {
        this.setState(
            { isOpenModalEditTaiKhoan: !this.state.isOpenModalEditTaiKhoan }
        )
    }

    //GỌI API CẬP NHẬT THÔNG TIN TÀI KHOẢN
    editTaiKhoan = async (taiKhoan) => {
        try {
            let response = await taiKhoanService.editTaiKhoan(taiKhoan)
            if (!response || response.errCode === 0) {
                await this.getDSTaiKhoan()
                this.setState({
                    isOpenModalEditTaiKhoan: false
                })

            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }
    }
    //-------------------------------------------------------------------------------------------------------
    openDeleteTaiKhoan = async (id) => {
        this.setState(
            {
                isOpenModalDeleteTaiKhoan: true,
                idDelete: id
            }
        )
    }

    toggleModalDeleteTaiKhoan = () => {
        this.setState(
            { isOpenModalDeleteTaiKhoan: !this.state.isOpenModalDeleteTaiKhoan }
        )
    }
    //GỌI API XÓA TÀI KHOẢN
    deleteTaiKhoan = async (id) => {
        try {
            let response = await taiKhoanService.deleteTaiKhoan(id)
            if (response && response.errCode === 0) {
                await this.getDSTaiKhoan()
                this.setState({
                    isOpenModalDeleteTaiKhoan: false
                })
            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }
    }

    //----------------------------------------------------------------------------------------------
    //GỌI API TÌM KIẾM TÀI KHOẢN
    searchTaiKhoan = async (type, keyword) => {
        try {
            if (!type) {
                this.thongBao(-1, "Vui lòng chọn mục tìm kiếm!")
            }
            else {
                if (!keyword) {
                    this.thongBao(-1, "Vui lòng nhập từ khóa tìm kiếm!")
                }
                else {
                    let response = await taiKhoanService.searchTaiKhoan(type, keyword)
                    if (response && response.errCode === 0) {
                        this.setState({
                            DSTaiKhoan: response.DSTaiKhoan
                        })
                    }
                    else { this.thongBao(response.errCode, response.message) }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          const inputElements = document.querySelectorAll('.search input, .search select');
          const currentIndex = Array.from(inputElements).indexOf(event.target);
          if (currentIndex < inputElements.length - 1) {
            inputElements[currentIndex + 1].focus();
          } else {
            this.searchTaiKhoan(this.state.type, this.state.keyword)
          }
        }
    }

    //----------------------------------------------------------------------------------------------
    //RENDER
    render() {
        let DSTaiKhoan = this.state.DSTaiKhoan
        return (
            <div className="users-container">
                <div className="title text-center">Quản Lí Tài Khoản</div>
                <ModalCreateTaiKhoan
                    isOpen={this.state.isOpenModalCreateTaiKhoan}
                    toggleModalCreateTaiKhoan={this.toggleModalCreateTaiKhoan}
                    createTaiKhoan={this.createTaiKhoan}
                />
                {this.state.isOpenModalEditTaiKhoan &&
                    <ModalEditTaiKhoan
                        isOpen={this.state.isOpenModalEditTaiKhoan}
                        toggleModalEditTaiKhoan={this.toggleModalEditTaiKhoan}
                        taiKhoan={this.state.taiKhoanEdit}
                        editTaiKhoan={this.editTaiKhoan}
                    />}
                {this.state.isOpenModalDeleteTaiKhoan &&
                    <ModalDeleteTaiKhoan
                        isOpen={this.state.isOpenModalDeleteTaiKhoan}
                        toggleModalDeleteTaiKhoan={this.toggleModalDeleteTaiKhoan}
                        id={this.state.idDelete}
                        deleteTaiKhoan={this.deleteTaiKhoan}
                    />}
                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.openCreateTaiKhoan()}>
                        <i className='fas fa-plus'></i> Thêm Tài Khoản</button>
                </div>
                <div class="col-12">
                    <div class="search-container">
                        <div className='mt-1 mx-3'>
                            <button className='btn px-3'
                                onClick={() => this.getDSTaiKhoan()}>Tất cả tài khoản</button>
                        </div>
                        <div class="form-group search-div">
                            <div class="search">
                                <span>
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }} onKeyDown={this.handleKeyDown}>
                                        <option value="">Chọn mục</option>
                                        <option value="username">Username</option>
                                        <option value="hoTen">Họ Tên</option>
                                        <option value="sdt">Số điện thoại</option>
                                        <option value="diaChi">Địa chỉ</option>
                                        <option value="vaiTro">Vai Trò</option>
                                    </select>
                                </span>
                                <input type="text" placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" onChange={(event) => { this.handleOnChange(event, "keyword") }}
                                onKeyDown={this.handleKeyDown} />
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchTaiKhoan(this.state.type, this.state.keyword) }}> <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='user-table mt-4 mx-3'>
                    <table class="table table-striped mt-3 ">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Username</th>
                                <th>Họ Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Vai Trò</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSTaiKhoan && DSTaiKhoan.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.username}</td>
                                            <td>{item.hoTen}</td>
                                            <td>{item.sdt}</td>
                                            <td>{item.diaChi}</td>
                                            <td>{item.vaiTro}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-edit'
                                                    onClick={() => this.openEditTaiKhoan(item)}><FiEdit /></button>
                                                <button className='btn-del'
                                                    onClick={() => this.openDeleteTaiKhoan(item.idTK)}><LuTrash2 /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaiKhoan);
