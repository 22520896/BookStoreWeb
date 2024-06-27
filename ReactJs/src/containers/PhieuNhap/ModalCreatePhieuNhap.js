import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreatePhieuNhap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngayLap: new Date().toISOString().slice(0, 10),
            sach: "",
            theLoai: "",
            tacGia: "",
            soLuong: "",
            donGiaNhap: "",
            CTPN: []
        };
    }

    componentDidMount() { }

    toggle = () => {
        this.setState({
            ngayLap: new Date().toISOString().slice(0, 10),
            sach: "",
            theLoai: "",
            tacGia: "",
            soLuong: "",
            donGiaNhap: "",
            CTPN: []
        });
        this.props.toggleModalCreatePhieuNhap();
    };

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        copyState.taiKhoan[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.modal-user-container input, .modal-user-container select');
            const currentIndex = Array.from(inputElements).indexOf(event.target);
            if (currentIndex < inputElements.length - 1) {
                inputElements[currentIndex + 1].focus(); // Move focus to next input
            } else {
                this.createTaiKhoan(); // Submit on Enter in the last input
            }
        }
    };

    createTaiKhoan = () => {
        let isValid = this.checklValidInput();
        if (isValid) {
            this.props.createTaiKhoan(this.state.taiKhoan); // Defined in parent, called here
        }
    };


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-pn-container" size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>
                    LẬP PHIẾU NHẬP
                </ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div class="form-group">
                            <label>Ngày Lập</label>
                            <input type="date" className='form-control' value={this.state.ngayLap}></input>
                        </div>
                        <div className='ctpn-container'>
                            <span>Thông tin sách nhập</span>
                            <div className='row mt-3'>
                                <div className='col-6 form-group'>
                                    <label>Tên sách</label>
                                    <input type="text" className='form-control' onChange={(event) => { this.handleOnChange(event, "username") }} onKeyDown={this.handleKeyDown} />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Thể loại</label>
                                    <input type="text" className='form-control' required onChange={(event) => { this.handleOnChange(event, "password") }} onKeyDown={this.handleKeyDown} />
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6 form-group'>
                                        <label>Tác giả</label>
                                        <input type="text" className='form-control' onChange={(event) => { this.handleOnChange(event, "username") }} onKeyDown={this.handleKeyDown} />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Số lượng</label>
                                        <input type="text" className='form-control' required onChange={(event) => { this.handleOnChange(event, "password") }} onKeyDown={this.handleKeyDown} />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-6 form-group'>
                                        <label>Đơn giá nhập</label>
                                        <input type="text" className='form-control' onChange={(event) => { this.handleOnChange(event, "username") }} onKeyDown={this.handleKeyDown} />
                                    </div>
                                    <div className='col-6'>
                                        <button className='btn-add'>Thêm sách</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary" className="px-2" onClick={() => { this.createTaiKhoan() }}>
                        Thêm
                    </Button>{' '}
                    <Button color="secondary" className='px-2' onClick={() => { this.toggle() }}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreatePhieuNhap);
