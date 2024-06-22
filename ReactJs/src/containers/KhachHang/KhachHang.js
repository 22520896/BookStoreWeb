import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './KhachHang.scss'
import khachHangService from '../../services/khachHangService'
class KhachHang extends Component {

    constructor(props) {
        super(props)
        this.state = {
            DSKhachHang: [],
            // isOpenModalCreateKhachHang: false,
            // isOpenModalEditKhachHang: false,
            // isOpenModalDeleteKhachHang: false,
            // KhachHangEdit: {}, 
            // type: "",
            // keyword: "",
            // idDelete: ""
        }
    }

    async componentDidMount() { //Gán giá trị cho biến state -> Gọi API
        await this.getDSKhachHang()
    }

    // handleOnChange = (event, id) => {
    //     let copyState = { ...this.state }
    //     copyState[id] = event.target.value
    //     this.setState({
    //         ...copyState
    //     })
    //     console.log(this.state[id])
    // }


    //GỌI API LẤY DANH SÁCH TÀI KHOẢN
    getDSKhachHang = async () => {
        let response = await khachHangService.getDSKhachHang()
        if (response && response.errCode === 0) {
            this.setState({
                DSKhachHang: response.DSKhachHang
            })
        }
    }

    // //------------------------------------------------------------------------
    // //ĐÓNG/MỞ MODAL THÊM TÀI KHOẢN MỚI
    // openCreateKhachHang = () => {
    //     this.setState(
    //         { isOpenModalCreateKhachHang: true }
    //     )
    // }

    // toggleModalCreateKhachHang = () => {
    //     this.setState(
    //         { isOpenModalCreateKhachHang: !this.state.isOpenModalCreateKhachHang }
    //     )
    // }

    // //GỌI API THÊM TÀI KHOẢN MỚI
    // createKhachHang = async (data) => {
    //     try {
    //         let response = await KhachHangService.createKhachHang(data)
    //         if (!response || response.errCode === 0) {
    //             await this.getDSKhachHang()
    //             this.setState({
    //                 isOpenModalCreateKhachHang: false
    //             })
    //         } else {
    //             alert(response.message)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }

    // }
    // //-------------------------------------------------------------------------------------------------------

    // //ĐÓNG/MỞ MODAL CHỈNH SỬA TÀI KHOẢN
    // openEditKhachHang = async (data) => {
    //     this.setState(
    //         {
    //             isOpenModalEditKhachHang: true,
    //             KhachHangEdit: data
    //         }
    //     )
    // }

    // toggleModalEditKhachHang = () => {
    //     this.setState(
    //         { isOpenModalEditKhachHang: !this.state.isOpenModalEditKhachHang }
    //     )
    // }

    // //GỌI API CẬP NHẬT THÔNG TIN TÀI KHOẢN
    // editKhachHang = async (KhachHang) => {
    //     try {
    //         let response = await KhachHangService.editKhachHang(KhachHang)
    //         if (!response || response.errCode === 0) {
    //             await this.getDSKhachHang()
    //             this.setState({
    //                 isOpenModalEditKhachHang: false
    //             })
    //         } else {
    //             alert(response.message)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // //-------------------------------------------------------------------------------------------------------
    // openDeleteKhachHang = async (id) => {
    //     this.setState(
    //         {
    //             isOpenModalDeleteKhachHang: true,
    //             idDelete: id
    //         }
    //     )
    // }

    // toggleModalDeleteKhachHang = () => {
    //     this.setState(
    //         { isOpenModalDeleteKhachHang: !this.state.isOpenModalDeleteKhachHang }
    //     )
    // }
    // //GỌI API XÓA TÀI KHOẢN
    // deleteKhachHang = async (id) => {
    //     try {
    //         let response = await KhachHangService.deleteKhachHang(id)
    //         if (response && response.errCode === 0) {
    //             await this.getDSKhachHang()
    //             this.setState({
    //                 isOpenModalDeleteKhachHang: false
    //             })
    //         } else {
    //             alert(response.message)
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // //----------------------------------------------------------------------------------------------
    // //GỌI API TÌM KIẾM TÀI KHOẢN
    // searchKhachHang = async (type, keyword) => {
    //     try {
    //         let response = await KhachHangService.searchKhachHang(type, keyword)
    //         if (response && response.errCode === 0) {
    //             this.setState({
    //                 DSKhachHang: response.DSKhachHang
    //             })
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    render() {
        let DSKhachHang = this.state.DSKhachHang
        return (
            <div className="kh-container">
                <div className="title text-center">Quản Lí Khách Hàng</div>
                {/* <ModalCreateKhachHang
                    isOpen={this.state.isOpenModalCreateKhachHang}
                    toggleModalCreateKhachHang={this.toggleModalCreateKhachHang}
                    createKhachHang={this.createKhachHang}
                />
                {this.state.isOpenModalEditKhachHang &&
                    <ModalEditKhachHang
                        isOpen={this.state.isOpenModalEditKhachHang}
                        toggleModalEditKhachHang={this.toggleModalEditKhachHang}
                        KhachHang={this.state.KhachHangEdit}
                        editKhachHang={this.editKhachHang}
                    />}
                {this.state.isOpenModalDeleteKhachHang &&
                    <ModalDeleteKhachHang
                        isOpen={this.state.isOpenModalDeleteKhachHang}
                        toggleModalDeleteKhachHang={this.toggleModalDeleteKhachHang}
                        id={this.state.idDelete}
                        deleteKhachHang={this.deleteKhachHang}
                    />} */}
                {/* <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.openCreateKhachHang()}>
                        <i className='fas fa-plus'></i> Thêm Khách Hàng</button>
                </div> */}
                {/* <div class="col-12">
                    <div class="search-container">
                        <div className='mt-1 mx-3'>
                            <button className='btn px-3'
                                onClick={() => this.getDSKhachHang()}>Tất cả khách hàng</button>
                        </div>
                        <div class="form-group search-div">
                            <div class="search">
                                <span>
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }}>
                                        <option value="">Chọn mục</option>
                                        <option value="username">Username</option>
                                        <option value="hoTen">Họ Tên</option>
                                        <option value="sdt">Số điện thoại</option>
                                        <option value="diaChi">Địa chỉ</option>
                                        <option value="vaiTro">Vai Trò</option>
                                    </select>
                                </span>
                                <input type="text" placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" onChange={(event) => { this.handleOnChange(event, "keyword") }} />
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchKhachHang(this.state.type, this.state.keyword) }}> <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='user-table mt-4 mx-3'> */}
                    {/* <table id="customers">
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

                            {DSKhachHang && DSKhachHang.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td>{item.username}</td>
                                            <td>{item.hoTen}</td>
                                            <td>{item.sdt}</td>
                                            <td>{item.diaChi}</td>
                                            <td>{item.vaiTro}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-edit'
                                                    onClick={() => this.openEditKhachHang(item)}><i class="fas fa-pencil-alt"></i></button>
                                                <button className='btn-del'
                                                    onClick={() => this.openDeleteKhachHang(item.idTK)}><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            }
                        </tbody>
                    </table> */}
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>Địa Chỉ</th>
                                <th>Email</th>
                                <th>Tiền Nợ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSKhachHang && DSKhachHang.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.ten}</td>
                                            <td>{item.sdt}</td>
                                            <td>{item.email}</td>
                                            <td>{item.diaChi}</td>
                                            <td>{item.tienNo}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-edit'
                                                    //onClick={() => this.openEditKhachHang(item)}
                                                    >
                                                    <i class="fas fa-pencil-alt"></i></button>
                                                <button className='btn-del'
                                                    //onClick={() => this.openDeleteKhachHang(item.idTK)}
                                                    ><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            //</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(KhachHang);
