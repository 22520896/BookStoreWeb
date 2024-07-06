import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import phieuNhapService from '../../services/phieuNhapService'
import { toast } from 'react-toastify';
import ModalShowPhieuNhap from './ModalShowPhieuNhap';
import { LuTrash2 } from "react-icons/lu";


class ModalCreatePhieuNhap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngayLap: new Date().toISOString().slice(0, 10),
            message: '',
            CT: {
                sach: "",
                theLoai: "",
                tacGia: "",
                soLuong: "",
                donGiaNhap: "",
            },
            CTPN: []
        };
    }

    componentDidMount() { }

    toggle = () => {
        this.setState({
            ngayLap: new Date().toISOString().slice(0, 10),
            message: '',
            CT: {
                sach: "",
                theLoai: "",
                tacGia: "",
                soLuong: "",
                donGiaNhap: "",
            },
            CTPN: []
        });
        this.props.toggleModalCreatePhieuNhap();
    };

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        if (id == 'ngayLap') {
            copyState[id] = event.target.value;
        }
        else {
            copyState.CT[id] = event.target.value;
        }
        this.setState({
            ...copyState,
        });
    };

    referSach = async () => {
        let response = await phieuNhapService.referSach(this.state.CT.sach)
        if (response) {
            if (response.errCode === 0) {
                let ct = response.ct
                ct.soLuong = this.state.CT.soLuong
                this.setState({
                    CT: ct
                })
            }
            else {
                if (response.errCode == 3) {
                    this.thongBao(-2, response.message)
                }
                else {
                    this.thongBao(-1, response.message)
                }
            }
            return response.errCode
        }
        return -1
    }

    checklValidInput = () => {
        const inputElements = document.querySelectorAll('.modal-pn-container input')
        let arrInput = ['sach', 'theLoai', 'tacGia', 'donGiaNhap', 'soLuong']
        let arr = ['Tên sách', 'Thể loại', 'Tác giả', 'Đơn giá nhập', 'Số Lượng']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.CT[arrInput[i]]) {
                this.setState({
                    message: `Vui lòng điền ${arr[i]}!`,
                });
                inputElements[i + 1].focus()
                return false;
            }
        }
        return true
    }

    //THÊM CHI TIẾT MỚI NHẬP VÀO PHIẾU NHẬP
    addCTPN = async () => {
        let isValid = this.checklValidInput()
        if (isValid) {
            const inputElements = document.querySelectorAll('.modal-pn-container input');
            let response = await phieuNhapService.checkCTPN(this.state.CT)
            if (response && (response.errCode == 0)) {
                this.setState({
                    CTPN: [...this.state.CTPN, this.state.CT],
                    message: '',
                    CT: {
                        sach: "",
                        theLoai: "",
                        tacGia: "",
                        donGiaNhap: "",
                        soLuong: "",
                    },
                    isOpenModalShowPhieuNhap: false
                })
                inputElements[1].focus()
            }
            else this.thongBao(-1, response.message)
        }
    }


    handleKeyDown = async (event, id) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.modal-pn-container input');
            if (id == 1) {
                let errCode = await this.referSach()
                if (errCode === 0) {
                    inputElements[5].focus()
                }
                else {
                    if (errCode === 3) {
                        inputElements[id + 1].focus()
                    }
                    else inputElements[id].focus()
                }
            }
            else {
                if (id < inputElements.length - 1)
                    inputElements[id + 1].focus()
                else {
                    this.addCTPN();
                }
            }
        }
    }

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
            if (errCode == -2) toast.warning(message, prop)
            else toast.error(message, prop)
        }
    }

    deleteCTPN = (index) => {
        let newCTPN = this.state.CTPN.slice(0, index).concat(this.state.CTPN.slice(index + 1))
        this.setState({
            CTPN: newCTPN
        })
    }

    openShowPhieuNhap = () => {
        const inputElements = document.querySelectorAll('.modal-pn-container input')
        if (!this.state.ngayLap) {
            this.thongBao(-1, 'Vui lòng chọn ngày lập!')
            inputElements[0].focus()
        }
        else {
            if (this.state.CTPN.length == 0) {
                this.thongBao(-1, 'Phiếu nhập sách phải có ít nhất một chi tiết!')
            }
            else {
                this.setState(
                    { isOpenModalShowPhieuNhap: true }
                )
            }
        }
    }

    toggleModalShowPhieuNhap = () => {
        this.setState(
            { isOpenModalShowPhieuNhap: !this.state.isOpenModalShowPhieuNhap }
        )
    }

    createPhieuNhap = async () => {
        let data = {
            ngayLap: this.state.ngayLap,
            CTPN: this.state.CTPN
        }

        await this.props.createPhieuNhap(data)
        this.setState({
            isOpenModalShowPhieuNhap: false
        })
        this.setState({
            ngayLap: new Date().toISOString().slice(0, 10),
            message: '',
            CT: {
                sach: "",
                theLoai: "",
                tacGia: "",
                soLuong: "",
                donGiaNhap: "",
            },
            CTPN: []
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-pn-container" size='lg' centered>
                <ModalShowPhieuNhap
                    isOpen={this.state.isOpenModalShowPhieuNhap}
                    toggleModalShowPhieuNhap={this.toggleModalShowPhieuNhap}
                    createPhieuNhap={this.createPhieuNhap}
                    CTPN={this.state.CTPN}
                    ngayLap={this.state.ngayLap}
                />
                <ModalHeader toggle={() => { this.toggle() }}>
                    LẬP PHIẾU NHẬP
                </ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div class="form-group">
                            <label>Ngày lập phiếu</label>
                            <input type="date" className='form-control' value={this.state.ngayLap} onChange={(event) => { this.handleOnChange(event, "ngayLap") }} onKeyDown={(event) => { this.handleKeyDown(event, 0) }}></input>
                        </div>
                        <span className='ctpn-tt'>Thông tin sách nhập</span>
                        <div className='ctpn-container'>
                            <div className='row mt-3'>
                                <div className='col-6 form-group'>
                                    <label>Tên sách</label>
                                    <input type="text" className='form-control' value={this.state.CT.sach} onChange={(event) => { this.handleOnChange(event, "sach") }} onKeyDown={(event) => { this.handleKeyDown(event, 1) }} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Thể loại</label>
                                    <input type="text" className='form-control' value={this.state.CT.theLoai} onChange={(event) => { this.handleOnChange(event, "theLoai") }} onKeyDown={(event) => { this.handleKeyDown(event, 2) }} />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-6 form-group'>
                                    <label>Tác giả</label>
                                    <input type="text" className='form-control' value={this.state.CT.tacGia} onChange={(event) => { this.handleOnChange(event, "tacGia") }} onKeyDown={(event) => { this.handleKeyDown(event, 3) }} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Đơn giá nhập</label>
                                    <input type="number" className='form-control' value={this.state.CT.donGiaNhap} onChange={(event) => { this.handleOnChange(event, "donGiaNhap") }} onKeyDown={(event) => { this.handleKeyDown(event, 4) }} />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-6 form-group'>
                                    <label>Số lượng</label>
                                    <input type="number" value={this.state.CT.soLuong} className='form-control' required onChange={(event) => { this.handleOnChange(event, "soLuong") }} onKeyDown={(event) => { this.handleKeyDown(event, 5) }} />
                                </div>
                                <div className='col-6'>
                                    <button className='btn-add' onClick={this.addCTPN}>Thêm sách</button>
                                </div>
                            </div>
                        
                        <div className='pn-container mt-4 mx-3'>
                            <table class="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th className='stt'>STT</th>
                                        <th>Tên sách</th>
                                        <th>Thể loại</th>
                                        <th>Tác giả</th>
                                        <th className = 'sl'>Số lượng</th>
                                        <th className = 'dgn'>Đơn giá nhập</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.CTPN && this.state.CTPN.map((item, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td className = 'stt'>{index + 1}</td>
                                                    <td>{item.sach}</td>
                                                    <td>{item.theLoai}</td>
                                                    <td>{item.tacGia}</td>
                                                    <td className = 'sl'>{item.soLuong}</td>
                                                    <td className = 'dgn'>{item.donGiaNhap}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <button className='btn-del'
                                                            onClick={() => this.deleteCTPN(index)}><LuTrash2 /></button>
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" className="print px-2" onClick={() => { this.openShowPhieuNhap() }}>
                        Xuất
                    </Button>{' '}
                    <Button color="secondary" className='exit px-2' onClick={() => { this.toggle() }}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal >
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatePhieuNhap);
