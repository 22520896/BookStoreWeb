import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

  constructor(props) {
    super(props) //props = properties - truyền prop từ cha xuống con
    this.state = {
      Errmessage: "",
      user: {
        username: "",
        password: "",
        vaiTro: "",
        hoTen: "",
        diaChi: "",
        std: ""
      }
    }
  }

  componentDidMount() {
  }

  toggle = () => {
    this.setState({
      errMessage: ""
    })
    this.props.toggleUserModal()
  }

  handleOnChange = (event, id) => {
    let copyState = { ...this.state }
    copyState.user[id] = event.target.value
    this.setState({
      ...copyState
    })
  }

  checklValidInput = () => {
    this.setState({
      errMessage: ""
    })

    let arrInput = ['username', 'password', "vaiTro", "hoTen", "diaChi", "sdt"]
    let arr = ['Username', 'Password', "Vai Trò", "Họ Tên", "Địa Chỉ", "Số Điện Thoại"]
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state.user[arrInput[i]]) {
        this.setState({
          errMessage: `Vui lòng điền ${arr[i]}!`
        })
        return false
      }
    }
    return true
  }

  handleAddNewUser = () => {
    let isValid = this.checklValidInput()
    if (isValid) {
      this.props.addNewUser(this.state.user)
    }
  }


  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }}
        className="modal-user-container" size='lg' centered>
        <ModalHeader toggle={() => { this.toggle() }}>
          TẠO TÀI KHOẢN MỚI</ModalHeader>
        <ModalBody>
          <div className='container'>
            <div className='row'>
              <div className='col-6 form-group'>
                <label >Username</label>
                <input type="text" className='form-control' required={true} onChange={(event) => { this.handleOnChange(event, "username") }} />
              </div>

              <div className='col-6 form-group'>
                <label>Password</label>
                <input type="password" className='form-control' required onChange={(event) => { this.handleOnChange(event, "password") }} />
              </div>

              <div className="form-group mt-3">
                <label>Vai Trò</label>
                <select className="form-select" onChange={(event) => { this.handleOnChange(event, "vaiTro") }}>
                  <option value=""></option>
                  <option value="1">Admin</option>
                  <option value="2">Thủ Kho</option>
                  <option value="3">Nhân Viên Bán Hàng</option>
                </select>
              </div>

              <div class="form-group mt-3">
                <label>Họ Tên</label>
                <input type="text" class="form-control" placeholder="Nguyễn Văn A" onChange={(event) => { this.handleOnChange(event, "hoTen") }} />
              </div>

              <div class="form-group mt-3">
                <label>Địa Chỉ</label>
                <input type="text" className="form-control"
                  placeholder="193/19 Nam Kỳ Khởi Nghĩa, P7, Q3, TP.HCM" onChange={(event) => { this.handleOnChange(event, "diaChi") }} />
              </div>

              <div class="form-group mt-3">
                <label>Số Điện Thoại</label>
                <input type="tel" className="form-control" name="sdt" onChange={(event) => { this.handleOnChange(event, "sdt") }} required={true}
                />
              </div>

              <div className='col-12 mt-2' style={{ color: "red" }}>
                {this.state.errMessage}
              </div>

            </div>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" className="px-2" onClick={() => { this.handleAddNewUser() }}>
            Thêm
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
