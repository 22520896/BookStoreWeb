import React, { Component } from 'react';
import { connect } from 'react-redux';
import './KhachHang.scss'
import khachHangService from '../../services/khachHangService'
import ModalCreateKhachHang from './ModalCreateKhachHang';
import ModalEditKhachHang from "./ModalEditKhachHang"
import ModalDeleteKhachHang from "./ModalDeleteKhachHang"
import { toast } from 'react-toastify';
import { LuTrash2 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";



class KhachHang extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DSKhachHang: [],
            isOpenModalCreateKhachHang: false,
            isOpenModalEditKhachHang: false,
            isOpenModalDeleteKhachHang: false,
            khachHangEdit: {},
            type: "",
            keyword: "",
            idDelete: ""
        }
    }

    async componentDidMount() { //Gán giá trị cho biến state -> Gọi API
        await this.getDSKhachHang()
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
        console.log(this.state[id])
    }


    //GỌI API LẤY DANH SÁCH TÀI KHOẢN
    getDSKhachHang = async () => {
        let response = await khachHangService.getDSKhachHang()
        if (response && response.errCode === 0) {
            this.setState({
                DSKhachHang: response.DSKhachHang
            })
        }
    }

    //------------------------------------------------------------------------
    //ĐÓNG/MỞ MODAL THÊM TÀI KHOẢN MỚI
    openCreateKhachHang = () => {
        this.setState(
            { isOpenModalCreateKhachHang: true }
        )
    }

    toggleModalCreateKhachHang = () => {
        this.setState(
            { isOpenModalCreateKhachHang: !this.state.isOpenModalCreateKhachHang }
        )
    }

    //GỌI API THÊM TÀI KHOẢN MỚI
    createKhachHang = async (data) => {
        try {
            let response = await khachHangService.createKhachHang(data)
            if (!response || response.errCode === 0) {
                await this.getDSKhachHang()
                this.setState({
                    isOpenModalCreateKhachHang: false
                })

            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }

    }
    //-------------------------------------------------------------------------------------------------------

    //ĐÓNG/MỞ MODAL CHỈNH SỬA TÀI KHOẢN
    openEditKhachHang = async (data) => {
        this.setState(
            {
                isOpenModalEditKhachHang: true,
                khachHangEdit: data
            }
        )
    }

    toggleModalEditKhachHang = () => {
        this.setState(
            { isOpenModalEditKhachHang: !this.state.isOpenModalEditKhachHang }
        )
    }

    //GỌI API CẬP NHẬT THÔNG TIN TÀI KHOẢN
    editKhachHang = async (khachHang) => {
        try {
            let response = await khachHangService.editKhachHang(khachHang)
            if (!response || response.errCode === 0) {
                await this.getDSKhachHang()
                this.setState({
                    isOpenModalEditKhachHang: false
                })

            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }
    }
    //-------------------------------------------------------------------------------------------------------
    openDeleteKhachHang = async (id) => {
        this.setState(
            {
                isOpenModalDeleteKhachHang: true,
                idDelete: id
            }
        )
    }

    toggleModalDeleteKhachHang = () => {
        this.setState(
            { isOpenModalDeleteKhachHang: !this.state.isOpenModalDeleteKhachHang }
        )
    }
    //GỌI API XÓA TÀI KHOẢN
    deleteKhachHang = async (id) => {
        try {
            let response = await khachHangService.deleteKhachHang(id)
            if (response && response.errCode === 0) {
                await this.getDSKhachHang()
                this.setState({
                    isOpenModalDeleteKhachHang: false
                })
            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }
    }

    //----------------------------------------------------------------------------------------------
    //GỌI API TÌM KIẾM TÀI KHOẢN
    searchKhachHang = async (type, keyword) => {
        try {
            if (!type) {
                this.thongBao(-1, "Vui lòng chọn mục tìm kiếm!")
            }
            else {
                if (!keyword) {
                    this.thongBao(-1, "Vui lòng nhập từ khóa tìm kiếm!")
                }
                else {
                    let response = await khachHangService.searchKhachHang(type, keyword)
                    if (response && response.errCode === 0) {
                        this.setState({
                            DSKhachHang: response.DSKhachHang
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
                this.searchKhachHang(this.state.type, this.state.keyword)
            }
        }
    }

    //----------------------------------------------------------------------------------------------
    //RENDER
    render() {
        if (this.props.userInfo.vaiTro == 2) {
            return null; // Hide the component if user role is not 1 (Admin)
        }
        let DSKhachHang = this.state.DSKhachHang
        return (
            <div className="kh-container">
                <div className="title text-center">Quản Lí Khách Hàng</div>
                <ModalCreateKhachHang
                    isOpen={this.state.isOpenModalCreateKhachHang}
                    toggleModalCreateKhachHang={this.toggleModalCreateKhachHang}
                    createKhachHang={this.createKhachHang}
                />
                {this.state.isOpenModalEditKhachHang &&
                    <ModalEditKhachHang
                        isOpen={this.state.isOpenModalEditKhachHang}
                        toggleModalEditKhachHang={this.toggleModalEditKhachHang}
                        khachHang={this.state.khachHangEdit}
                        editKhachHang={this.editKhachHang}
                    />}
                {this.state.isOpenModalDeleteKhachHang &&
                    <ModalDeleteKhachHang
                        isOpen={this.state.isOpenModalDeleteKhachHang}
                        toggleModalDeleteKhachHang={this.toggleModalDeleteKhachHang}
                        id={this.state.idDelete}
                        deleteKhachHang={this.deleteKhachHang}
                    />}
                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.openCreateKhachHang()}>
                        <i className='fas fa-plus'></i> Thêm Khách Hàng</button>
                </div>
                <div class="col-12">
                    <div class="search-container">
                        <div className='mt-1 mx-3'>
                            <button className='btn px-3'
                                onClick={() => this.getDSKhachHang()}><u>Tất cả khách hàng</u></button>
                        </div>
                        <div class="form-group search-div">
                            <div class="search">
                                <span>
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }} onKeyDown={this.handleKeyDown}>
                                        <option value="">Chọn mục</option>
                                        <option value="ten">Họ Tên</option>
                                        <option value="sdt">Số điện thoại</option>
                                        <option value="diaChi">Địa chỉ</option>
                                        <option value="email">Email</option>
                                    </select>
                                </span>
                                <input type="text" placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" onChange={(event) => { this.handleOnChange(event, "keyword") }}
                                    onKeyDown={this.handleKeyDown} />
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchKhachHang(this.state.type, this.state.keyword) }}> <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='kh-table mt-4 mx-3'>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th className='stt'>STT</th>
                                <th>Họ Tên</th>
                                <th className='stt'>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Email</th>
                                <th className='tienno'>Tiền Nợ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSKhachHang && DSKhachHang.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td className='stt'>{index + 1}</td>
                                            <td>{item.ten}</td>
                                            <td className='stt'>{item.sdt}</td>
                                            <td>{item.diaChi}</td>
                                            <td>{item.email}</td>
                                            <td className='tienno'>{item.tienNo.toLocaleString('vi-VN')}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-edit'
                                                    onClick={() => this.openEditKhachHang(item)}><FiEdit /></button>
                                                <button className='btn-del'
                                                    onClick={() => this.openDeleteKhachHang(item.sdt)}><LuTrash2 /></button>
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KhachHang);