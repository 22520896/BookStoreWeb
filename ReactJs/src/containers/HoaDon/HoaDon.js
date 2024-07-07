import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HoaDon.scss'
import hoaDonService from '../../services/hoaDonService.js'
import { toast } from 'react-toastify';
import moment from 'moment';
import { GoPaste } from "react-icons/go";
import ModalCreateHoaDon from './ModalCreateHoaDon';
import ModalViewHoaDon from './ModalViewHoaDon';


class HoaDon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DSHoaDon: [],
            isOpenModalCreateHoaDon: false,
            isOpenModalViewHoaDon: false,
            HD: "", 
            type: "",
            keyword: "",
            date: new Date().toISOString().slice(0, 10)
        }
    }
    async componentDidMount() {
        await this.getDSHoaDon()
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
    getDSHoaDon = async () => {
        let response = await hoaDonService.getDSHoaDon()
        if (response && response.errCode === 0) {
            this.setState({
                DSHoaDon: response.DSHoaDon
            })
        }
    }


    //GỌI API TÌM KIẾM HÓA ĐƠN
    searchHoaDon = async (type) => {
        try {
            if (!type) {
                this.thongBao(-1, "Vui lòng chọn mục tìm kiếm!")
            }            
            else {       
                let keyword = type == 'ngayLap' ? this.state.date : this.state.keyword
                if (type == 'ngayLap' && !this.state.date){
                    this.thongBao(-1, "Ngày lập không hợp lệ!")
                }
                else{
                    if (!keyword) {
                        this.thongBao(-1, "Vui lòng nhập từ khóa tìm kiếm!")
                    }
                    else {
                        let response = await hoaDonService.searchHoaDon(type, keyword)
                        if (response && response.errCode === 0) {
                            this.setState({
                                DSHoaDon: response.DSHoaDon
                            })
                        }
                        else { this.thongBao(response.errCode, response.message) }
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleKeyDown = (event, id) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.search input, .search select');
            if (id < inputElements.length - 1) {
                inputElements[id+ 1].focus();
            } else {
                this.searchHoaDon(this.state.type)
            }
        }
    }

    openCreateHoaDon = () => {
        this.setState(
            { isOpenModalCreateHoaDon: true }
        )
    }

    toggleModalCreateHoaDon = () => {
        this.setState(
            { isOpenModalCreateHoaDon: !this.state.isOpenModalCreateHoaDon }
        )
    }

    createHoaDon = async (data) => {
        try {
            let response = await hoaDonService.createHoaDon(data)
            if (response && response.errCode === 0) {
                await this.getDSHoaDon()
                this.setState({
                    isOpenModalCreateHoaDon: false
                })
            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }
    }
    toggleModalViewHoaDon = () => {
        this.setState(
            { isOpenModalViewHoaDon: !this.state.isOpenModalViewHoaDon }
        )
    }

    openModalViewHoaDon = async (HD) => {
        let response = await hoaDonService.getCTHD(HD.idHD)
        if (response.errCode == 0) {
            this.setState({
                HD: {
                    ngayLap: HD.ngayLap,
                    sdt: HD.sdt,
                    hoTen: HD.hoTen,
                    tongTien: HD.tongTien,
                    soTienTra: HD.soTienTra,
                    tienTraLai: HD.tienTraLai,
                    no: HD.no,                   
                    CTHD: response.CTHD,
                }, 

                isOpenModalViewHoaDon: true
            })            
        }
        else this.thongBao (-1, response.message)
    }
    //----------------------------------------------------------------------------------------------
    //RENDER
    render() {
        if (this.props.userInfo.vaiTro == 2) {
            return null; // Hide the component if user role is not 1 (Admin)
        }
        let DSHoaDon = this.state.DSHoaDon
        return (
            <div className="hd-container">
                <div className="title text-center">Quản Lí Bán Sách</div>
                <ModalCreateHoaDon
                    isOpen={this.state.isOpenModalCreateHoaDon}
                    toggleModalCreateHoaDon={this.toggleModalCreateHoaDon}
                    createHoaDon={this.createHoaDon}
                />
                <ModalViewHoaDon
                    isOpen={this.state.isOpenModalViewHoaDon}
                    toggleModalViewHoaDon={this.toggleModalViewHoaDon}
                    HD={this.state.HD}
                /> 

                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.openCreateHoaDon()}>
                        <i className='fas fa-plus'></i> Thêm Hóa Đơn</button>
                </div>
                <div class="col-12">
                    <div class="search-container">
                        <div className='mt-1 mx-3'>
                            <button className='btn px-3'
                                onClick={() => this.getDSHoaDon()}><u>Tất cả hóa đơn</u></button>
                        </div>
                        <div class="form-group search-div">
                            <div class="search">
                                <span>
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }} onKeyDown={(event) => { this.handleKeyDown(event, 0) }}>
                                        <option value="">Chọn mục</option>
                                        <option value="idHD">Mã Hóa Đơn</option>
                                        <option value="ngayLap">Ngày Lập</option>
                                        <option value="sdt">Số Điện Thoại</option>
                                        <option value="hoTen">Khách Hàng</option>
                                    </select>
                                </span>
                                <input type={this.state.type == 'ngayLap' ? 'date' : 'text'} placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" value={this.state.type == 'ngayLap' ? this.state.date : this.state.keyword}
                                    onChange={(event) => { this.handleOnChange(event, this.state.type == 'ngayLap' ? 'date' : "keyword") }} onKeyDown={(event) => { this.handleKeyDown(event, 1) }}/>
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchHoaDon(this.state.type) }} > <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hd-table mt-4 mx-3'>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th className='hd'>STT</th>
                                <th className='hd'>Mã Hóa Đơn</th>
                                <th>Ngày Lập</th>
                                <th className='hd'>Số Điện Thoại</th>
                                <th>Họ Tên</th>
                                <th className='hd'>Tổng Tiền</th>
                                <th className='hd'>Số Tiền Trả</th>
                                <th className='hd'>Tiền Trả Lại</th>
                                <th className='hd'>Nợ</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {DSHoaDon && DSHoaDon.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td className='hd'>{index + 1}</td>
                                            <td className='hd'>{item.idHD}</td>
                                            <td>{moment(item.ngayLap).format("DD/MM/YYYY")}</td>
                                            <td className='hd'>{item.sdt}</td>
                                            <td>{item.hoTen}</td>
                                            <td className='hd'>{item.tongTien.toLocaleString('vi-VN')}</td>
                                            <td className='hd'>{item.soTienTra.toLocaleString('vi-VN')}</td>
                                            <td className='hd'>{item.tienTraLai.toLocaleString('vi-VN')}</td>
                                            <td className='hd'>{item.no.toLocaleString('vi-VN')}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-detail' onClick={() => { this.openModalViewHoaDon(item) }} title='Chi tiết phiếu nhập'> <GoPaste /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HoaDon);
