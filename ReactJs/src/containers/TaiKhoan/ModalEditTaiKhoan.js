import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'
import { toast } from 'react-toastify';

class ModalEditTaiKhoan extends Component {

    constructor(props) {
        super(props) //props = properties - truyền prop từ cha xuống con
        this.state = {
            taiKhoan: {
                idTK: "",
                username: "",
                vaiTro: "",
                hoTen: "",
                diaChi: "",
                sdt: ""
            }
        }

    }

    componentDidMount() {
        let taiKhoan = this.props.taiKhoan
        //let { currentUser } = this.props
        if (taiKhoan && !_.isEmpty(taiKhoan)) {
            this.setState({
                taiKhoan: {
                    ...taiKhoan,
                },
            })
        }
    }

    toggle = () => {
        this.props.toggleModalEditTaiKhoan()
    }

    handleOnChange = (event, id) => {
        let copyState = { ...this.state }
        copyState.taiKhoan[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checklValidInput = () => {
        let arrInput = ["vaiTro", "hoTen", "diaChi", "sdt"]
        let arr = ["Vai Trò", "Họ Tên", "Địa Chỉ", "Số Điện Thoại"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state.taiKhoan[arrInput[i]]) {
                const inputElements = document.querySelectorAll('.modal-user-container input, .modal-user-container select');
                this.thongBao(-1, `Vui lòng điền ${arr[i]}!`)
                inputElements[i + 1].focus()
                return false;
            }
        }
        return true;
    };


    //GỌI API CHỈNH SỬA THÔNG TIN TÀI KHOẢN
    editTaiKhoan = () => {
        let isValid = this.checklValidInput()
        if (isValid) {
            this.props.editTaiKhoan(this.state.taiKhoan) //Định nghĩa ở cha, gọi ở con
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.modal-user-container input, .modal-user-container select');
            const currentIndex = Array.from(inputElements).indexOf(event.target);
            if (currentIndex < inputElements.length - 1) {
                inputElements[currentIndex + 1].focus();
            } else {
                this.editTaiKhoan();
            }
        }
    }

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


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-user-container" size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>
                    CẬP NHẬT THÔNG TIN TÀI KHOẢN</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='form-group'>
                                <label >Username</label>
                                <input type="text" className='form-control' required={true} onChange={(event) => { this.handleOnChange(event, "username") }}
                                    value={this.state.taiKhoan.username}
                                    disabled />
                            </div>

                            <div className="form-group mt-3">
                                <label>Vai Trò</label>
                                <select className="form-select" onChange={(event) => { this.handleOnChange(event, "vaiTro") }} value={this.state.taiKhoan.vaiTro}
                                    onKeyDown={this.handleKeyDown}>
                                    <option value=""></option>
                                    <option value="1">Admin</option>
                                    <option value="2">Thủ Kho</option>
                                    <option value="3">Nhân Viên Bán Hàng</option>
                                </select>
                            </div>

                            <div class="form-group mt-3">
                                <label>Họ Tên</label>
                                <input type="text" class="form-control" required placeholder="Nguyễn Văn A" onChange={(event) => { this.handleOnChange(event, "hoTen") }} value={this.state.taiKhoan.hoTen} onKeyDown={this.handleKeyDown} />
                            </div>

                            <div class="form-group mt-3">
                                <label>Địa Chỉ</label>
                                <input type="text" className="form-control" required
                                    placeholder="193/19 Nam Kỳ Khởi Nghĩa, P7, Q3, TP.HCM" onChange={(event) => { this.handleOnChange(event, "diaChi") }} value={this.state.taiKhoan.diaChi} onKeyDown={this.handleKeyDown} />
                            </div>

                            <div class="form-group mt-3">
                                <label>Số Điện Thoại</label>
                                <input type="tel" className="form-control" name="sdt" onChange={(event) => { this.handleOnChange(event, "sdt") }} required value={this.state.taiKhoan.sdt} onKeyDown={this.handleKeyDown} />
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" className="submit px-2" onClick={() => { this.editTaiKhoan() }}>
                        Lưu
                    </Button>{' '}
                    <Button color="secondary" className='exit px-2' onClick={() => { this.toggle() }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTaiKhoan);
