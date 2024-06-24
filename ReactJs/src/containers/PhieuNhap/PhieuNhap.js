import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './PhieuNhap.scss'
import phieuNhapService from '../../services/phieuNhapService'
import { toast } from 'react-toastify';

class PhieuNhap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DSPhieuNhap: [],
            isOpenModalCreatePhieuNhap: false,
            isOpenModalCTPN: false,
            CTPN: {},
            type: "",
            keyword: "",
        }
    }
    handleOnChange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    //TẠO THÔNG BÁO
    thongBao = (errCode, message) => {
        let prop = {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            closeButton: false,
            className: 'custom-toast', 
            bodyClassName: 'custom-toast-body' 
        }
        if (errCode === 0) {
            toast.success(message, prop)
        }
        else {
            toast.error(message, prop)
        }
    }

    //GỌI API LẤY DANH SÁCH PHIẾU NHẬP
    getDSPhieuNhap = async () => {
        let response = await phieuNhapService.getDSPhieuNhap()
        if (response && response.errCode === 0) {
            this.setState({
                DSPhieuNhap: response.DSPhieuNhap
            })
        }
    }

        
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
                    let response = await phieuNhapService.searchPhieuNhap(type, keyword)
                    if (response && response.errCode === 0) {
                        this.setState({
                            DSPhieuNhap: response.DSPhieuNhap
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
        let DSPhieuNhap = this.state.DSPhieuNhap
        let date = new Date().toISOString().slice(0, 10)
        return (
            <div className="pn-container">
                <div className="title text-center">Quản Lí Nhập Sách</div>
                {/* <ModalCreatePhieuNhap
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
                    />} */}
                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                    >
                        <i className='fas fa-plus'></i> Thêm Phiếu Nhập</button>
                </div>
                <div class="col-12">
                    <div class="search-container">
                        <div className='mt-1 mx-3'>
                            <button className='btn px-3'
                                onClick={() => this.getDSPhieuNhap()}>Tất cả phiếu nhập</button>
                        </div>
                        <div class="form-group search-div">
                            <div class="search">
                                <span>
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }}>
                                        <option value="">Chọn mục</option>
                                        <option value="idPN">Mã Phiếu</option>
                                        <option value="ngayLap">Ngày Lập</option>
                                    </select>
                                </span>
                                <input type={this.state.type == 'ngayLap' ? 'date' : 'text'} placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" value={this.state.keyword}
                                    onChange={(event) => { this.handleOnChange(event, "keyword") }} />
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchTaiKhoan(this.state.type, this.state.keyword) }} > <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pn-table mt-4 mx-3'>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã Phiếu</th>
                                <th>Ngày Lập</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSPhieuNhap && DSPhieuNhap.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.idPN}</td>
                                            <td>{item.ngayLap}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-detail'>
                                                    <i class="fa-regular fa-clipboard"></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhieuNhap);
