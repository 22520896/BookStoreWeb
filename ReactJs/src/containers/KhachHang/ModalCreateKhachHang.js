import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreateKhachHang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            khachHang: {
                ten: "",
                diaChi: "",
                sdt: "",
                email: ""
            },
        };
    }

    componentDidMount() { }

    toggle = () => {
        this.setState({
            message: "",
            khachHang: {
                ten: "",
                diaChi: "",
                sdt: "",
                email: ""
            },
        });
        this.props.toggleModalCreateKhachHang();
    };

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        copyState.khachHang[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.modal-kh-container input, .modal-kh-container select');
            const currentIndex = Array.from(inputElements).indexOf(event.target);
            if (currentIndex < inputElements.length - 1) {
                inputElements[currentIndex + 1].focus();
            } else {
                this.createKhachHang();
            }
        }
    };

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

    createKhachHang = () => {
        let isValid = this.checklValidInput();
        if (isValid) {
            this.props.createKhachHang(this.state.khachHang); // Defined in parent, called here
        }
    };


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-kh-container" size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>
                    THÊM KHÁCH HÀNG
                </ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='form-group'>
                                <label>Họ Tên Khách Hàng</label>
                                <input type="text" className='form-control' required={true} onChange={(event) => { this.handleOnChange(event, "ten") }} onKeyDown={this.handleKeyDown} />
                            </div>
                            <div class="form-group mt-3">
                                <label>Số Điện Thoại</label>
                                <input type="tel" class="form-control" required onChange={(event) => { this.handleOnChange(event, "sdt") }} onKeyDown={this.handleKeyDown}/>
                            </div>
                            <div class="form-group mt-3">
                                <label>Địa Chỉ</label>
                                <input type="text" className="form-control" required onChange={(event) => { this.handleOnChange(event, "diaChi") }} onKeyDown={this.handleKeyDown} />
                            </div>
                            <div class="form-group mt-3">
                                <label>Email</label>
                                <input type="email" className="form-control" onChange={(event) => { this.handleOnChange(event, "email") }} required onKeyDown={this.handleKeyDown} />
                            </div>
                            <div className='col-12 mt-2' style={{ color: "red" }}>
                                {this.state.message}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" className="btn-submit px-2" onClick={() => { this.createKhachHang() }}>
                        Thêm
                    </Button>{' '}
                    <Button color="secondary" className='btn-exit px-2' onClick={() => { this.toggle() }}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateKhachHang);
