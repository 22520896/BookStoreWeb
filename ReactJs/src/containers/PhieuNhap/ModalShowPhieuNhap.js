import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import ReactToPrint from "react-to-print";

class ModalShowPhieuNhap extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef(); // Create a ref for ModalBody
    }

    toggle = () => {
        this.props.toggleModalShowPhieuNhap();
    };

    createPhieuNhap = () => {
        this.props.createPhieuNhap();
    };

    render() {
        const { CTPN } = this.props;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} className="modal-ct-pn-container" size='lg' centered>
                <ModalHeader toggle={this.toggle}>
                    IN PHIẾU NHẬP
                </ModalHeader>
                <ModalBody>
                    <div ref={this.componentRef}>
                        <div className='container'>
                            <div className="store">Nhà sách ABC</div>
                            <div className='tittle'>PHIẾU NHẬP SÁCH</div>
                            <span className='ngay'>Ngày lập phiếu: {moment(this.props.ngayLap).format("DD/MM/YYYY")}</span>
                            <div className='ct-pn-table mt-4 mx-3'>
                                <table className="table mt-3">
                                    <thead>
                                        <tr>
                                            <th className='stt'>STT</th>
                                            <th>Tên sách</th>
                                            <th>Tác giả</th>
                                            <th>Thể loại</th>
                                            <th className='sl'>Số lượng</th>
                                            <th className='dgn'>Đơn giá nhập</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {CTPN && CTPN.map((item, index) => (
                                            <tr key={index}>
                                                <td className='stt'>{index + 1}</td>
                                                <td>{item.sach}</td>
                                                <td>{item.tacGia}</td>
                                                <td>{item.theLoai}</td>
                                                <td className='sl'>{item.soLuong}</td>
                                                <td className='dgn'>{Number(item.donGiaNhap).toLocaleString('vi-VN')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className='sign'>
                                    <div>
                                        Thủ kho<br />
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
                                In (Lưu)
                            </Button>
                        )}
                        onAfterPrint={this.createPhieuNhap}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalShowPhieuNhap);
