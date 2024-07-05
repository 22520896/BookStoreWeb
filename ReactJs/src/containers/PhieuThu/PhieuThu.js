import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './PhieuThu.scss'
import phieuThuService from '../../services/phieuThuService'
class PhieuThu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DSPhieuThu: [],
            isOpenModalCreatePhieuThu: false,
            isOpenModalViewPhieuThu: false,
            PT: "",
            type: "",
            keyword: "",
            date: new Date().toISOString().slice(0, 10)
        }
    }
    async componentDidMount() {
        await this.getDSPhieuThu()
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
    getDSPhieuThu = async () => {
        let response = await phieuThuService.getDSPhieuThu()
        if (response && response.errCode === 0) {
            this.setState({
                DSPhieuThu: response.DSPhieuThu
            })
        }
    }


    //GỌI API TÌM KIẾM PHIẾU NHẬP
    searchPhieuThu = async (type) => {
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
                        let response = await phieuThuService.searchPhieuThu(type, keyword)
                        if (response && response.errCode === 0) {
                            this.setState({
                                DSPhieuThu: response.DSPhieuThu
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
                this.searchPhieuThu(this.state.type)
            }
        }
    }

    openCreatePhieuThu = () => {
        this.setState(
            { isOpenModalCreatePhieuThu: true }
        )
    }

    toggleModalCreatePhieuThu = () => {
        this.setState(
            { isOpenModalCreatePhieuThu: !this.state.isOpenModalCreatePhieuThu }
        )
    }

    createPhieuThu = async (data) => {
        try {
            let response = await phieuThuService.createPhieuThu(data)
            if (response && response.errCode === 0) {
                await this.getDSPhieuThu()
                this.setState({
                    isOpenModalCreatePhieuThu: false
                })
            }
            this.thongBao(response.errCode, response.message)
        } catch (e) {
            console.log(e)
        }
    }
    toggleModalViewPhieuThu = () => {
        this.setState(
            { isOpenModalViewPhieuThu: !this.state.isOpenModalViewPhieuThu }
        )
    }

    openModalViewPhieuThu = async (PT) => {
        let response = await phieuThuService.getCTPT(PT.idPT)
        if (response.errCode == 0) {
            this.setState({
                PT: {
                    ngayLap: PT.ngayLap,
                    CTPT: response.CTPT,
                }, 

                isOpenModalViewPhieuThu: true
            })            
        }
        else this.thongBao (-1, response.message)
    }
    //----------------------------------------------------------------------------------------------
    //RENDER
    render() {
        let DSPhieuThu = this.state.DSPhieuThu
        return (
            <div className="PT-container">
                <div className="title text-center">Quản Lí Thu Tiền</div>
                <ModalCreatePhieuThu
                    isOpen={this.state.isOpenModalCreatePhieuThu}
                    toggleModalCreatePhieuThu={this.toggleModalCreatePhieuThu}
                    createPhieuThu={this.createPhieuThu}
                />
                <ModalViewPhieuThu
                    isOpen={this.state.isOpenModalViewPhieuThu}
                    toggleModalViewPhieuThu={this.toggleModalViewPhieuThu}
                    PT={this.state.PT}
                />

                <div className='mt-1 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.openCreatePhieuThu()}>
                        <i className='fas fa-plus'></i> Thêm Phiếu Nhập</button>
                </div>
                <div class="col-12">
                    <div class="search-container">
                        <div className='mt-1 mx-3'>
                            <button className='btn px-3'
                                onClick={() => this.getDSPhieuThu()}>Tất cả phiếu nhập</button>
                        </div>
                        <div class="form-group search-div">
                            <div class="search">
                                <span>
                                    <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }} onKeyDown={(event) => { this.handleKeyDown(event, 0) }}>
                                        <option value="">Chọn mục</option>
                                        <option value="idPT">Mã Phiếu</option>
                                        <option value="ngayLap">Ngày Lập</option>
                                    </select>
                                </span>
                                <input type={this.state.type == 'ngayLap' ? 'date' : 'text'} placeholder="Nhập từ khóa tìm kiếm" class="form-control keyword" value={this.state.type == 'ngayLap' ? this.state.date : this.state.keyword}
                                    onChange={(event) => { this.handleOnChange(event, this.state.type == 'ngayLap' ? 'date' : "keyword") }} onKeyDown={(event) => { this.handleKeyDown(event, 1) }}/>
                            </div>
                            <div class="search-btn">
                                <button type="submit" class="btn btn-base" onClick={() => { this.searchPhieuThu(this.state.type) }} > <i class="fas fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='PT-table mt-4 mx-3'>
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
                            {DSPhieuThu && DSPhieuThu.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.idPT}</td>
                                            <td>{moment(item.ngayLap).format("DD/MM/YYYY")}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className='btn-detail' onClick={() => { this.openModalViewPhieuThu(item) }} title='Chi tiết phiếu nhập'> <GoPaste /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhieuThu);
