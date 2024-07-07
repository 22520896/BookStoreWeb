import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { toast } from 'react-toastify';

class ModalEditKhachHang extends Component {

    constructor(props) {
        super(props)
        this.state = {
            khachHang: {
                ten: "",
                diaChi: "",
                sdt: "",
                email: "",
                tienNo: ""
            },
        }

    }

    componentDidMount() {
        let khachHang = this.props.khachHang
        //let { currentUser } = this.props
        if (khachHang && !_.isEmpty(khachHang)) {
            this.setState({
                khachHang: {
                    ...khachHang,
                },
            })
        }
    }

    toggle = () => {
        this.props.toggleModalEditKhachHang()
    }

    handleOnChange = (event, id) => {
        let copyState = { ...this.state }
        copyState.khachHang[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checklValidInput = () => {
        let arrInput = ['ten', 'sdt', 'diaChi', 'email'];
        let arr = ['Họ tên khách hàng', 'Số điện thoại', 'Địa chỉ', 'Email'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.khachHang[arrInput[i]]) {
                const inputElements = document.querySelectorAll('.modal-kh-container input');
                this.thongBao(-1, `Vui lòng điền ${arr[i]}!`)
                inputElements[i].focus()
                return false;
            }
        }
        return true;
    };

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

    //GỌI API CHỈNH SỬA THÔNG TIN TÀI KHOẢN
    editKhachHang = () => {
        let isValid = this.checklValidInput()
        if (isValid) {
            this.props.editKhachHang(this.state.khachHang) //Định nghĩa ở cha, gọi ở con
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.modal-kh-container input, .modal-kh-container select');
            const currentIndex = Array.from(inputElements).indexOf(event.target);
            if (currentIndex == 0) inputElements[currentIndex + 2].focus()
            else {
                if (currentIndex < inputElements.length - 1) {
                    inputElements[currentIndex + 1].focus();
                } else {
                    this.editKhachHang();
                }
            }
        }
    };


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-kh-container" size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>
                    CẬP NHẬT THÔNG TIN KHÁCH HÀNG</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='form-group'>
                                <label>Họ Tên Khách Hàng</label>
                                <input type="text" className='form-control' required={true} onChange={(event) => { this.handleOnChange(event, "ten") }} onKeyDown={this.handleKeyDown} value={this.state.khachHang.ten} />
                            </div>
                            <div class="form-group mt-3">
                                <label>Số Điện Thoại</label>
                                <input type="tel" class="form-control" required onChange={(event) => { this.handleOnChange(event, "sdt") }} onKeyDown={this.handleKeyDown} value={this.state.khachHang.sdt} disabled />
                            </div>
                            <div class="form-group mt-3">
                                <label>Địa Chỉ</label>
                                <input type="text" className="form-control" required onChange={(event) => { this.handleOnChange(event, "diaChi") }} value={this.state.khachHang.diaChi} onKeyDown={this.handleKeyDown} />
                            </div>
                            <div class="form-group mt-3">
                                <label>Email</label>
                                <input type="email" className="form-control" onChange={(event) => { this.handleOnChange(event, "email") }} value={this.state.khachHang.email} required onKeyDown={this.handleKeyDown} />
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" className="btn-submit px-2" onClick={() => { this.editKhachHang() }}>
                        Lưu
                    </Button>{' '}
                    <Button color="secondary" className='btn-exit px-2' onClick={() => { this.toggle() }}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditKhachHang);
