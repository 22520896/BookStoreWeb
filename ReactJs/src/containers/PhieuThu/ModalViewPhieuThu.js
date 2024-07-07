import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import ReactToPrint from "react-to-print";
import { FiPrinter } from "react-icons/fi";

class ModalViewPhieuThu extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef(); // Create a ref for ModalBody
    }

    toggle = () => {
        this.props.toggleModalViewPhieuThu();
    };

    createPhieuThu = () => {
        this.props.createPhieuThu();
    };

    render() {
        const PT = this.props.PT;
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} className="modal-spt-container" size='lg' centered>
                <ModalHeader toggle={this.toggle}>
                    CHI TIẾT PHIẾU THU
                </ModalHeader>
                <ModalBody>
                    <div ref={this.componentRef}>
                        <div className='frame'>
                            <div className='container'>
                                <div className='store'>Nhà sách ABC</div>
                                <div className='title'>PHIẾU THU TIỀN</div>
                                <span className='ngay'>Ngày thu tiền: {moment(PT.ngayThuTien).format("DD/MM/YYYY")}</span>
                                <div className='khs'>
                                    <p><span className='lefts'>Họ tên khách hàng: {PT.hoTen}</span>
                                        <span className='rights'>Số điện thoại: {PT.sdt}</span></p>
                                    <p>Địa chỉ: {PT.diaChi}</p>
                                    <p>Email: {PT.email}</p>
                                    <p>Số tiền thu: {Number(PT.soTienThu).toLocaleString('vi-VN')}</p>
                                </div>
                                <div className='signs'>
                                    <div>
                                        Nhân viên<br />
                                        <i>(Ký và họ tên)</i>
                                    </div>
                                    <div>
                                        Khách hàng<br />
                                        <i>(Ký và họ tên)</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <ReactToPrint
                        content={() => this.componentRef.current}
                        trigger={() => (
                            <Button type="submit" color="primary" className="print px-2" >
                                <FiPrinter /> In
                            </Button>
                        )}
                        onAfterPrint={this.toggle}
                    />
                    {' '}<Button color="secondary" className='exit px-2' onClick={this.toggle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalViewPhieuThu);
