import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalDeleteTaiKhoan extends Component {

    constructor(props) {
        super(props) //props = properties - truyền prop từ cha xuống con
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
        this.props.toggleModalDeleteTaiKhoan()
    }


    //GỌI API XÓA TÀI KHOẢN
    deleteTaiKhoan = () => {
            this.props.deleteTaiKhoan(this.state.id) //Định nghĩa ở cha, gọi ở con
    }


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
                className="modal-user-container" size='lg' centered>
                <ModalHeader toggle={() => { this.toggle() }}>
                    XÓA TÀI KHOẢN?</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <h5>Bạn có chắc chắn muốn xóa tài khoản này?</h5>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="danger" className="delete px-2" onClick={() => { this.deleteTaiKhoan() }}>
                        Xóa
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteTaiKhoan);
