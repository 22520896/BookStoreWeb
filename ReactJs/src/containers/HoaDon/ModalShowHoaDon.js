import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import ReactToPrint from "react-to-print";
import { FiPrinter } from "react-icons/fi";

class ModalShowHoaDon extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef(); // Create a ref for ModalBody
    }

    toggle = () => {
        this.props.toggleModalShowHoaDon();
    };

    createHoaDon = () => {
        this.props.createHoaDon();
    };

    render() {
        const { CTHD } = this.props;

        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} className="modal-shd-container" size='lg' centered>
                <ModalHeader toggle={this.toggle}>
                    IN HÓA ĐƠN
                </ModalHeader>
                <ModalBody>
                    <div className='container' ref={this.componentRef}>
                        <div className="store">Nhà sách ABC</div>
                        <div className='title'>HÓA ĐƠN</div>
                        <span className='ngay'>Ngày lập hóa đơn: {moment(this.props.ngayLap).format("DD/MM/YYYY")}</span>
                        <div className='cthd-table mt-4 mx-3'>
                            <div className="kh">
                                <span>Họ tên khách hàng: {this.props.hoTen}</span>
                                <span>Số điện thoại: {this.props.sdt}</span>
                            </div>
                            <table className="table mt-3">
                                <thead>
                                    <tr>
                                        <th className='stt'>STT</th>
                                        <th>Tên sách</th>
                                        <th>Thể loại</th>
                                        <th className='sl'>Số lượng</th>
                                        <th className='dgn'>Đơn giá bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CTHD && CTHD.map((item, index) => (
                                        <tr key={index}>
                                            <td className='stt'>{index + 1}</td>
                                            <td>{item.sach}</td>                                            
                                            <td>{item.theLoai}</td>
                                            <td className='sl'>{item.soLuong}</td>
                                            <td className='dgb'>{item.donGiaBan.toLocaleString('vi-VN')}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="4"></td>
                                        <td class='tonghd'>Tổng tiền: {Number(this.props.tongTien).toLocaleString('vi-VN')}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"></td>
                                        <td class='tonghd'>Số tiền trả: {Number(this.props.soTienTra).toLocaleString('vi-VN')}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"></td>
                                        <td class='tonghd'>Tiền trả lại: {Number(this.props.tienTraLai).toLocaleString('vi-VN')}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4"></td>
                                        <td class='tonghd'>Nợ: {Number(this.props.no).toLocaleString('vi-VN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='signs'>
                                <div>
                                    Nhân viên<br />
                                    <i>(Ký và họ tên)</i>
                                </div>
                                <div>
                                    Người mua hàng<br />
                                    <i>(Ký và họ tên)</i>
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
                        onAfterPrint={this.createHoaDon}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalShowHoaDon);
