import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalDeleteKhachHang extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            message: "",
            id:""
        }
    }

    componentDidMount() {
        let id = this.props.id
        if (id) {
            this.setState({
                id:id
            })
        }
    }

    toggle = () => {
        this.setState({
            message: ""
        })
        this.props.toggleModalDeleteKhachHang()
    }


    //GỌI API XÓA TÀI KHOẢN
    deleteKhachHang = () => {
            this.props.deleteKhachHang(this.state.id) //Định nghĩa ở cha, gọi ở con
    }


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-user-container" size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>
                    XÓA KHÁCH HÀNG?</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <h5>Bạn có chắc chắn muốn xóa khách hàng này?</h5>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="danger" className="px-2" onClick={() => { this.deleteKhachHang() }}>
                        Xóa
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteKhachHang);
