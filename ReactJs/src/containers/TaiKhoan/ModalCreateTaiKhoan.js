import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalCreateTaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      taiKhoan: {
        username: "",
        password: "",
        vaiTro: "",
        hoTen: "",
        diaChi: "",
        sdt: "",
      },
    };
  }

  componentDidMount() { }

  toggle = () => {
    this.setState({
      message: "",
      taiKhoan: {
        username: "",
        password: "",
        vaiTro: "",
        hoTen: "",
        diaChi: "",
        sdt: "",
      },
    });
    this.props.toggleModalCreateTaiKhoan();
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
      console.log(currentIndex)
      if (currentIndex < inputElements.length - 1) {
        inputElements[currentIndex + 1].focus(); // Move focus to next input
      } else {
        this.createTaiKhoan(); // Submit on Enter in the last input
      }
    }
  };

  checklValidInput = () => {
    this.setState({
      message: "",
    });

    let arrInput = ['username', 'password', 'vaiTro', 'hoTen', 'diaChi', 'sdt'];
    let arr = ['Username', 'Password', 'Vai Trò', 'Họ Tên', 'Địa Chỉ', 'Số Điện Thoại'];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state.taiKhoan[arrInput[i]]) {
        this.setState({
          message: `Vui lòng điền ${arr[i]}!`,
        });
        return false;
      }
    }
    return true;
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
        className="modal-user-container" size='lg' centered>
        <ModalHeader toggle={() => { this.toggle() }}>
          THÊM TÀI KHOẢN MỚI
        </ModalHeader>
        <ModalBody>
          <div className='container'>
            <div className='row'>
              <div className='col-6 form-group'>
                <label>Username</label>
                <input type="text" className='form-control' required={true} onChange={(event) => { this.handleOnChange(event, "username") }} onKeyDown={this.handleKeyDown} />
              </div>
              <div className='col-6 form-group'>
                <label>Password</label>
                <input type="password" className='form-control' required onChange={(event) => { this.handleOnChange(event, "password") }} onKeyDown={this.handleKeyDown} />
              </div>
              <div className="form-group mt-3">
                <label>Vai Trò</label>
                <select className="form-select" onChange={(event) => { this.handleOnChange(event, "vaiTro") }} onKeyDown={this.handleKeyDown}>
                  <option value=""></option>
                  <option value="1">Admin</option>
                  <option value="2">Thủ Kho</option>
                  <option value="3">Nhân Viên Bán Hàng</option>
                </select>
              </div>
              <div class="form-group mt-3">
                <label>Họ Tên</label>
                <input type="text" class="form-control" required placeholder="Nguyễn Văn A" onChange={(event) => { this.handleOnChange(event, "hoTen") }} onKeyDown={this.handleKeyDown} />
              </div>
              <div class="form-group mt-3">
                <label>Địa Chỉ</label>
                <input type="text" className="form-control" required placeholder="193/19 Nam Kỳ Khởi Nghĩa, P7, Q3, TP.HCM" onChange={(event) => { this.handleOnChange(event, "diaChi") }} onKeyDown={this.handleKeyDown} />
              </div>
              <div class="form-group mt-3">
                <label>Số Điện Thoại</label>
                <input type="tel" className="form-control" name="sdt" onChange={(event) => { this.handleOnChange(event, "sdt") }} required onKeyDown={this.handleKeyDown} />
              </div>
              <div className='col-12 mt-2' style={{ color: "red" }}>
                {this.state.message}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateTaiKhoan);
