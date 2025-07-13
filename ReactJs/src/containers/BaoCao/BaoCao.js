import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BaoCao.scss'
import baoCaoService from '../../services/baoCaoService.js'
import { toast } from 'react-toastify';
import ModalShowBaoCao from './ModalShowBaoCao.js'
class BaoCao extends Component {

    constructor(props) {
        super(props);
        this.state = {
            month: "",
            type: "",
            baoCao: [],
            isOpenModalShowBaoCao: false,
            message: ""
        }

    }

    handleKeyDown = async (event, id) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.bc-container input select');
            if (id < inputElements.length - 1) inputElements[id + 1].focus()
            else {
                this.openShowBaoCao()
            }
        }
    }

    handleOnChange = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        console.log(copyState)
        this.setState({
            ...copyState,
        });
    };

    thongBao = (errCode, message) => {
        let prop = {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            closeButton: false,
            className: 'custom-toast',
            bodyClassName: 'custom-toast-body'
        }
        if (errCode === 0) {
            toast.success(message, prop)
        }
        else {
            toast.error(message, prop)
        }
    }

    toggleModalShowBaoCao = () => {
        this.setState(
            { isOpenModalShowBaoCao: !this.state.isOpenModalShowBaoCao }
        )
    }

    checklValidInput = () => {
        const inputElements = document.querySelectorAll('.bc-container input, .bc-container select')
        let arrInput = ['month', 'type']
        let arr = ['Tháng', 'Loại báo cáo']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                this.thongBao(-1, `Vui lòng chọn ${arr[i]}!`)
                inputElements[i].focus()
                return false;
            }
        }
        return true
    }

    openModalShowBaoCao = async () => {
        let isValid = this.checklValidInput()
        if (isValid) {
            let time = this.state.month.split("-")
            let month = time[1]
            let year = time[0]
            let response = await baoCaoService.getBaoCao(month, year, this.state.type)
            if (response && response.errCode == 0) {
                this.setState(
                    {
                        baoCao: response.baoCao,
                        isOpenModalShowBaoCao: true
                    }
                )
            }
            else {
                this.thongBao(-1, response.message)
            }

        }
    }


    render() {
        if (this.props.userInfo.vaiTro == 3) {
            return null; // Hide the component if user role is not 1 (Admin)
        }
        return (
            <div className="bc-container">
                <div className="title text-center">Lập Báo Cáo Tháng</div>
                <ModalShowBaoCao
                    isOpen={this.state.isOpenModalShowBaoCao}
                    toggleModalShowBaoCao={this.toggleModalShowBaoCao}
                    baoCao={this.state.baoCao}
                />
                <div className='row mt-1 mx-3'>
                    <div class='col-6 form-group'>
                        <label>Tháng</label>
                        <input type="month" className='form-control' onChange={(event) => { this.handleOnChange(event, "month") }} onKeyDown={(event) => { this.handleKeyDown(event, 0) }}></input>
                    </div>
                    <div className='col-6'>
                        <label>Loại báo cáo</label>
                        <select className='form-select type' onChange={(event) => { this.handleOnChange(event, "type") }} onKeyDown={(event) => { this.handleKeyDown(event, 1) }}>
                            <option value="">Chọn loại</option>
                            <option value="ton">Tồn Sách</option>
                            <option value="congNo">Công Nợ</option>
                        </select>
                    </div>
                </div>
                <div className='mt-3 mx-3'>
                    <button className='btn btn-primary px-2'
                        onClick={() => this.openModalShowBaoCao()}>
                        Xuất</button>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaoCao);
