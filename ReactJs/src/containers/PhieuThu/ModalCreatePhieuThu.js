import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import phieuThuService from '../../services/phieuThuService'
import { toast } from 'react-toastify';
import ModalShowPhieuThu from './ModalShowPhieuThu';
import { LuTrash2 } from "react-icons/lu";


class ModalCreatePhieuThu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PT: {
                ngayThuTien: new Date().toISOString().slice(0, 10),
                sdt: "",
                hoTen: "",
                email: "",
                diaChi: "",
                soTienThu: "",
            },
            message: "",
            isOpenModalShowPhieuThu: false
        };
    }

    componentDidMount() { }

    toggle = () => {
        this.setState({
            PT: {
                ngayThuTien: new Date().toISOString().slice(0, 10),
                sdt: "",
                hoTen: "",
                email: "",
                diaChi: "",
                soTienThu: "",
            },
            message: "",
            isOpenModalShowPhieuThu: false
        });
        this.props.toggleModalCreatePhieuThu();
    };

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        copyState.PT[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };


    checklValidInput = () => {
        const inputElements = document.querySelectorAll('.modal-pt-container input')
        let arrInput = ['ngayThuTien', 'sdt', 'soTienThu']
        let arr = ['Ngày thu tiền', 'Số điện thoại', 'Số tiền thu']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.PT[arrInput[i]]) {
                this.thongBao(-1, `Vui lòng chọn ${arr[i]}!`)
                inputElements[i].focus()
                return false;
            }
        }
        return true
    }

    handleKeyDown = async (event, id) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.modal-pt-container input');
            if (id < inputElements.length - 1)
                inputElements[id + 1].focus()
            else {
                this.openShowPhieuThu();
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

    openShowPhieuThu = async () => {
        let isValid = this.checklValidInput()
        if (isValid) {
            const inputElements = document.querySelectorAll('.modal-pt-container input')
            if (new Date(this.state.ngayLap).getTime() > new Date().getTime()) {
                this.thongBao(-1, 'Ngày thu tiền không hợp lệ!')
                inputElements[0].focus()
            }
            else {
                let response = await phieuThuService.checkCTPT(this.state.PT)
                if (response && (response.errCode == 0)) {
                    let copyState = this.state.PT
                    copyState.hoTen = response.khachHang.ten
                    copyState.diaChi = response.khachHang.diaChi
                    copyState.email = response.khachHang.email
                    this.setState({
                        PT: copyState,
                        isOpenModalShowPhieuThu: true
                    })
                }
                else this.thongBao(-1, response.message)
            }
        }
    }

    toggleModalShowPhieuThu = () => {
        this.setState(
            { isOpenModalShowPhieuThu: !this.state.isOpenModalShowPhieuThu }
        )
    }

    createPhieuThu = async () => {
        await this.props.createPhieuThu(this.state.PT)
        this.setState({
            isOpenModalShowPhieuThu: false
        })
        this.setState({
            PT: {
                ngayThuTien: new Date().toISOString().slice(0, 10),
                sdt: "",
                hoTen: "",
                email: "",
                diaChi: "",
                soTienThu: "",
            },
            isOpenModalShowPhieuThu: false
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-pt-container" size='lg' centered>
                <ModalShowPhieuThu
                    isOpen={this.state.isOpenModalShowPhieuThu}
                    toggleModalShowPhieuThu={this.toggleModalShowPhieuThu}
                    createPhieuThu={this.createPhieuThu}
                    PT={this.state.PT}
                />
                <ModalHeader toggle={() => { this.toggle() }}>
                    LẬP PHIẾU THU
                </ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div class="col-12 form-group">
                            <label>Ngày thu tiền</label>
                            <input type="date" className='form-control' value={this.state.PT.ngayThuTien} onChange={(event) => { this.handleOnChange(event, "ngayThuTien") }} onKeyDown={(event) => { this.handleKeyDown(event, 0) }}></input>
                        </div>
                        <div class="col-12 form-group mt-3">
                            <label>Số điện thoại khách hàng</label>
                            <input type="tel" className='form-control' value={this.state.PT.sdt} onChange={(event) => { this.handleOnChange(event, "sdt") }} onKeyDown={(event) => { this.handleKeyDown(event, 1) }}></input>
                        </div>
                        <div class="col-12 form-group mt-3">
                            <label>Số tiền thu</label>
                            <input type="number" className='form-control' value={this.state.PT.soTienThu} onChange={(event) => { this.handleOnChange(event, "soTienThu") }} onKeyDown={(event) => { this.handleKeyDown(event, 2) }}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" className="submit px-2" onClick={() => { this.openShowPhieuThu() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatePhieuThu);
