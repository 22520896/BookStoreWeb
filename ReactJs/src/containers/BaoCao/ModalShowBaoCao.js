import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import ReactToPrint from "react-to-print";
import { FiPrinter } from "react-icons/fi";

class ModalShowBaoCao extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef(); // Create a ref for ModalBody
        this.state = {
            ngayLap: new Date().toISOString().slice(0, 10)
        }
    }

    toggle = () => {
        this.props.toggleModalShowBaoCao();
    };

    render() {
        const baoCao = this.props.baoCao;
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.toggle} className="modal-bc-container" size='lg' centered>
                <ModalHeader toggle={this.toggle}>
                    IN BÁO CÁO
                </ModalHeader>
                <ModalBody>
                    <div ref={this.componentRef}>
                    <div className='container' >
                        <div className='top'>
                            <span className="store">Nhà sách ABC</span>
                            <span className="date">Ngày lập: {moment(this.state.ngayLap).format("DD/MM/YYYY")}</span>
                        </div>
                        <div className='title'>BÁO CÁO {baoCao.loai == 'ton' ? "TỒN SÁCH" : "CÔNG NỢ"}</div>
                        <div className='month'>
                            <span>Tháng: {baoCao.thang}</span>
                            <span>Năm: {baoCao.nam}</span>
                        </div>
                        <div className='bc-table mt-4 mx-3'>
                            <table className="table table-striped mt-3">
                                {baoCao.loai === 'ton' && (
                                    <>
                                        <thead>
                                            <tr>
                                                <th className='bc'>STT</th>
                                                <th>Tên sách</th>
                                                <th className='bc'>Tồn đầu</th>
                                                <th className='bc'>Phát sinh</th>
                                                <th className='bc'>Tồn cuối</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {baoCao.baoCao.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='bc'>{index + 1}</td>
                                                    <td>{item.tenSach}</td>
                                                    <td className='bc'>{item.tonDau}</td>
                                                    <td className='bc'>{item.phatSinh}</td>
                                                    <td className='bc'>{item.tonCuoi}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </>
                                )}

                                {baoCao.loai == 'congNo' && (
                                      <>
                                      <thead>
                                          <tr>
                                              <th className='bc'>STT</th>
                                              <th>Khách hàng</th>
                                              <th className='bc'>Nợ đầu</th>
                                              <th className='bc'>Phát sinh</th>
                                              <th className='bc'>Nợ cuối</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {baoCao.baoCao.map((item, index) => (
                                              <tr key={index}>
                                                  <td className='bc'>{index + 1}</td>
                                                  <td>{item.hoTen}</td>
                                                  <td className='bc'>{item.noDau}</td>
                                                  <td className='bc'>{item.phatSinh}</td>
                                                  <td className='bc'>{item.noCuoi}</td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </>
                                    )}
                            </table>
                            <div className='sign'>
                                <div>
                                    Người lập báo cáo<br />
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
                                <FiPrinter/> In
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalShowBaoCao);
