import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalEditKhachHang extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: "",
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
        this.setState({
            message: ""
        })
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
        this.setState({
            message: "",
        });
        let arrInput = ['ten', 'sdt', 'diaChi', 'email'];
        let arr = ['Họ tên khách hàng', 'Số điện thoại', 'Họ tên', 'Email'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.khachHang[arrInput[i]]) {
                this.setState({
                    message: `Vui lòng điền ${arr[i]}!`,
                });
                return false;
            }
        }
        return true;
    };


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
            if (currentIndex < inputElements.length - 1) {
                inputElements[currentIndex + 1].focus();
            } else {
                this.editKhachHang();
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
                                <label>Họ tên khách hàng</label>
                                <input type="text" className='form-control' required={true} onChange={(event) => { this.handleOnChange(event, "ten") }} onKeyDown={this.handleKeyDown} value={this.state.khachHang.ten} />
                            </div>
                            <div class="form-group mt-3">
                                <label>Số điện thoại</label>
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
                            <div className='col-12 mt-2' style={{ color: "red" }}>
                                {this.state.message}
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" className="px-2" onClick={() => { this.editKhachHang() }}>
                        Lưu
                    </Button>{' '}
                    <Button color="secondary" className='px-2' onClick={() => { this.toggle() }}>
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
