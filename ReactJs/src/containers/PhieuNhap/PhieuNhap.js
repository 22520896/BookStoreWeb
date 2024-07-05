import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PhieuNhap.scss'
import phieuNhapService from '../../services/phieuNhapService'
import { toast } from 'react-toastify';
import ModalCreatePhieuNhap from './ModalCreatePhieuNhap';
import moment from 'moment';
import { GoPaste } from "react-icons/go";
import ModalViewPhieuNhap from './ModalViewPhieuNhap';


class PhieuNhap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DSPhieuNhap: [],
            isOpenModalCreatePhieuNhap: false,
            isOpenModalViewPhieuNhap: false,
            PN: "",
            type: "",
            keyword: "",
            date: new Date().toISOString().slice(0, 10)
        }
    }
    async componentDidMount() {
        await this.getDSPhieuNhap()
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
    searchPhieuNhap = async (type) => {
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
                        let response = await phieuNhapService.searchPhieuNhap(type, keyword)
                        if (response && response.errCode === 0) {
                            this.setState({
                                DSPhieuNhap: response.DSPhieuNhap
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
                this.searchPhieuNhap(this.state.type)
            }
        }
    }

    openCreatePhieuNhap = () => {
        this.setState(
            { isOpenModalCreatePhieuNhap: true }
        )
    }

    toggleModalCreatePhieuNhap = () => {
        this.setState(
            { isOpenModalCreatePhieuNhap: !this.state.isOpenModalCreatePhieuNhap }
        )
    }

    createPhieuNhap = async (data) => {
        try {
            let response = await phieuNhapService.createPhieuNhap(data)
            if (response && response.errCode === 0) {
                await this.getDSPhieuNhap()
                this.setState({
                    isOpenModalCreatePhieuNhap: false
                })
            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }
    }
    toggleModalViewPhieuNhap = () => {
        this.setState(
            { isOpenModalViewPhieuNhap: !this.state.isOpenModalViewPhieuNhap }
        )
    }

    openModalViewPhieuNhap = async (PN) => {
        let response = await phieuNhapService.getCTPN(PN.idPN)
        if (response.errCode == 0) {
            this.setState({
                PN: {
                    ngayLap: PN.ngayLap,
                    CTPN: response.CTPN,
                }, 

                isOpenModalViewPhieuNhap: true
            })            
        }
        else this.thongBao (-1, response.message)
    }
    //----------------------------------------------------------------------------------------------
    //RENDER
    render() {
        let DSPhieuNhap = this.state.DSPhieuNhap
        return (
            <div className="pn-container">
                <div className="title text-center">Quản Lí Nhập Sách</div>
                <ModalCreatePhieuNhap
                    isOpen={this.state.isOpenModalCreatePhieuNhap}
                    toggleModalCreatePhieuNhap={this.toggleModalCreatePhieuNhap}
                    createPhieuNhap={this.createPhieuNhap}
                />
                <ModalViewPhieuNhap
                    isOpen={this.state.isOpenModalViewPhieuNhap}
                    toggleModalViewPhieuNhap={this.toggleModalViewPhieuNhap}
                    PN={this.state.PN}
                />

                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.openCreatePhieuNhap()}>
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
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }} onKeyDown={(event) => { this.handleKeyDown(event, 0) }}>
                                        <option value="">Chọn mục</option>
                                        <option value="idPN">Mã Phiếu</option>
                                        <option value="ngayLap">Ngày Lập</option>
                                    </select>
                                </span>
                                <input type={this.state.type == 'ngayLap' ? 'date' : 'text'} placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" value={this.state.type == 'ngayLap' ? this.state.date : this.state.keyword}
                                    onChange={(event) => { this.handleOnChange(event, this.state.type == 'ngayLap' ? 'date' : "keyword") }} onKeyDown={(event) => { this.handleKeyDown(event, 1) }}/>
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchPhieuNhap(this.state.type) }} > <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pn-table mt-4 mx-3'>
                    <table class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th className = 'stt'>STT</th>
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
                                            <td className = 'stt'>{index + 1}</td>
                                            <td>{item.idPN}</td>
                                            <td>{moment(item.ngayLap).format("DD/MM/YYYY")}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-detail' onClick={() => { this.openModalViewPhieuNhap(item) }} title='Chi tiết phiếu nhập'> <GoPaste /></button>
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
