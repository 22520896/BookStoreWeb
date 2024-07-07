import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import hoaDonService from '../../services/hoaDonService'
import { toast } from 'react-toastify';
import ModalShowHoaDon from './ModalShowHoaDon';
import { LuTrash2 } from "react-icons/lu";


class ModalCreateHoaDon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngayLap: new Date().toISOString().slice(0, 10),
            sdt: "",
            hoTen: "",
            tongTien: 0,
            soTienTra: "",
            tienTraLai: "",
            no: "",
            CT: {
                sach: "",
                soLuong: "",
            },
            CTHD: []
        };
    }

    componentDidMount() { }

    toggle = () => {
        this.setState({
            ngayLap: new Date().toISOString().slice(0, 10),
            sdt: "",
            hoTen: "",
            tongTien: 0,
            soTienTra: "",
            tienTraLai: "",
            no: "",
            CT: {
                sach: "",
                soLuong: "",
            },
            CTHD:[]
        });
        this.props.toggleModalCreateHoaDon();
    };

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        if (id == 'sach' || id == 'soLuong') {
            copyState.CT[id] = event.target.value;
        }
        else {
            copyState[id] = event.target.value;
            if (id == 'soTienTra') {
                if (copyState.tongTien <= copyState.soTienTra) {
                    copyState.tienTraLai = copyState.soTienTra - copyState.tongTien
                    copyState.no = 0
                }
                else {
                    copyState.tienTraLai = 0
                    copyState.no = copyState.tongTien - copyState.soTienTra
                }
            }
        }
        this.setState({
            ...copyState,
        });
    };

    checklValidInput = () => {
        const inputElements = document.querySelectorAll('.modal-hd-container input')
        let arrInput = ['sach', 'soLuong']
        let arr = ['Tên sách', 'Số lượng']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.CT[arrInput[i]]) {
                this.thongBao(-1, `Vui lòng điền ${arr[i]}!`)
                inputElements[i + 2].focus()
                return false;
            }
        }
        return true
    }

    //THÊM CHI TIẾT MỚI NHẬP VÀO HÓA ĐƠN
    addCTHD = async () => {
        let isValid = this.checklValidInput()
        if (isValid) {
            const inputElements = document.querySelectorAll('.modal-hd-container input');
            let response = await hoaDonService.checkCTHD(this.state.CT)
            if (response && (response.errCode == 0)) {
                this.setState({
                    CTHD: [...this.state.CTHD, response.ct],
                    CT: {
                        sach: "",
                        soLuong: "",
                    },
                    tongTien: this.state.tongTien + response.ct.thanhTien
                })
            }
            else {
                this.thongBao(-1, response.message)
            }
            inputElements[2].focus() //Input Tên sách
        }
    }


    handleKeyDown = async (event, id) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.modal-hd-container input');
            if (id == 3)  //Input Số lượng
                this.addCTHD()
            else {
                if (id < inputElements.length - 1) inputElements[id + 1].focus()
                else {
                    this.openShowHoaDon()
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

    deleteCTHD = (index) => {
        let tien = this.state.CTHD[index].thanhTien
        let newCTHD = this.state.CTHD.slice(0, index).concat(this.state.CTHD.slice(index + 1))
        this.setState({
            CTHD: newCTHD,
            tongTien: this.state.tongTien - tien
        })
    }

    openShowHoaDon = async () => {
        const inputElements = document.querySelectorAll('.modal-hd-container input')
        if (!this.state.ngayLap || new Date(this.state.ngayLap).getTime()>new Date().getTime()) {
            this.thongBao(-1, 'Ngày lập không hợp lệ!')
            inputElements[0].focus()

        }
        else {
            if (this.state.CTHD.length == 0) {
                this.thongBao(-1, 'Phiếu nhập sách phải có ít nhất một chi tiết!')
                inputElements[2].focus()
            }
            else {
                if (!this.state.soTienTra) {
                    this.thongBao(-1, 'Vui lòng nhập Số tiền trả!')
                    inputElements[4].focus()
                }
                else {
                    if (!this.state.sdt) {
                        this.thongBao(-1, 'Vui lòng nhập Số điện thoại khách hàng!')
                        inputElements[1].focus()
                    }
                    else {
                        let response = await hoaDonService.checkKhachHang({
                            sdt: this.state.sdt,
                            no: this.state.no
                        })

                        if (response.errCode == 0) {
                            this.setState({
                                hoTen: response.hoTen,
                                isOpenModalShowHoaDon: true
                            })
                        }
                        else {
                            this.thongBao(-1, response.message)
                        }
                    }
                }
            }
        }
    }

    toggleModalShowHoaDon = () => {
        this.setState(
            { isOpenModalShowHoaDon: !this.state.isOpenModalShowHoaDon }
        )
    }

    createHoaDon = async () => {
        let data = {
            ngayLap: this.state.ngayLap,
            sdt: this.state.sdt,
            hoTen: this.state.hoTen,
            tongTien: this.state.tongTien,
            soTienTra: this.state.soTienTra,
            tienTraLai: this.state.tienTraLai,
            no: this.state.no,
            CTHD: this.state.CTHD
        }

        await this.props.createHoaDon(data)
        this.setState({
            isOpenModalShowHoaDon: false,
            ngayLap: new Date().toISOString().slice(0, 10),
            sdt: "",
            hoTen: "",
            tongTien: 0,
            soTienTra: "",
            tienTraLai: "",
            no: "",
            CT: {
                sach: "",
                soLuong: "",
            },
            CTHD: []
        })
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-hd-container" size='lg' centered>
                <ModalShowHoaDon
                    isOpen={this.state.isOpenModalShowHoaDon}
                    toggleModalShowHoaDon={this.toggleModalShowHoaDon}
                    createHoaDon={this.createHoaDon}
                    CTHD={this.state.CTHD}
                    ngayLap={this.state.ngayLap}
                    hoTen={this.state.hoTen}
                    sdt={this.state.sdt}
                    tongTien={this.state.tongTien}
                    soTienTra={this.state.soTienTra}
                    tienTraLai={this.state.tienTraLai}
                    no={this.state.no}
                />
                <ModalHeader toggle={() => { this.toggle() }}>
                    LẬP HÓA ĐƠN
                </ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row mt-3'>
                            <div class='col-6 form-group'>
                                <label>Ngày lập hóa đơn</label>
                                <input type="date" className='form-control' value={this.state.ngayLap} onChange={(event) => { this.handleOnChange(event, "ngayLap") }} onKeyDown={(event) => { this.handleKeyDown(event, 0) }}></input>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại khách hàng</label>
                                <input type="tel" className='form-control' value={this.state.sdt} onChange={(event) => { this.handleOnChange(event, "sdt") }} onKeyDown={(event) => { this.handleKeyDown(event, 1) }} />
                            </div>
                        </div>
                        <span className='ttsb'>Thông tin sách bán</span>
                        <div className='cthd-container'>
                            <div className='row mt-3'>
                                <div className='col-6 form-group'>
                                    <label>Tên sách</label>
                                    <input type="text" className='form-control' value={this.state.CT.sach} onChange={(event) => { this.handleOnChange(event, "sach") }} onKeyDown={(event) => { this.handleKeyDown(event, 2) }} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số lượng</label>
                                    <input type="number" className='form-control' value={this.state.CT.soLuong} onChange={(event) => { this.handleOnChange(event, "soLuong") }} onKeyDown={(event) => { this.handleKeyDown(event, 3) }} />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-12'>
                                    <button className='btn-add' onClick={this.addCTHD}>Thêm sách</button>
                                </div>
                            </div>
                        
                        <div className='hd-container mt-4 mx-3'>
                            <table class="table table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th className='stt'>STT</th>
                                        <th>Tên sách</th>
                                        <th>Thể loại</th>
                                        <th className='dgb'>Đơn giá bán</th>
                                        <th className='sl'>Số lượng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.CTHD && this.state.CTHD.map((item, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td className='stt'>{index + 1}</td>
                                                    <td>{item.sach}</td>
                                                    <td>{item.theLoai}</td>
                                                    <td className='dgb'>{item.donGiaBan.toLocaleString('vi-VN')}</td>
                                                    <td className='sl'>{item.soLuong}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <button className='btn-del'
                                                            onClick={() => this.deleteCTHD(index)}><LuTrash2 /></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                            <div className='row mt-3 money'>
                                <div className='col-6 form-group'>
                                    <label>Số tiền trả</label>
                                    <input type="number" className='form-control' value={this.state.soTienTra} onChange={(event) => { this.handleOnChange(event, "soTienTra") }} onKeyDown={(event) => { this.handleKeyDown(event, 4) }} />
                                </div>
                                <div className='tien col-6'>
                                    Tổng tiền    : {this.state.tongTien.toLocaleString('vi-VN')}<br />
                                    Tiền trả lại : {this.state.tienTraLai.toLocaleString('vi-VN')}<br />
                                    Nợ           : {this.state.no.toLocaleString('vi-VN')}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </ModalBody >
                <ModalFooter>
                    <Button type="submit" color="primary" className="submit px-2" onClick={() => { this.openShowHoaDon() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateHoaDon);
