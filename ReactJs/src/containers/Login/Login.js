import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';

import taiKhoanService from '../../services/taiKhoanService.js'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            message: ""
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            message: ""
        })

        try {
            let data = await taiKhoanService.handleLogin(this.state.username, this.state.password)
            if (data && data.errCode != 0) {
                this.setState({
                    message: data.message
                })
            }
            else if (data && data.errCode == 0) {
                this.props.userLoginSuccess(data.taiKhoan)
                console.log('Đăng nhập thành công!')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        message: e.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputElements = document.querySelectorAll('.login-container input');
            const currentIndex = Array.from(inputElements).indexOf(event.target);
            if (currentIndex < inputElements.length - 1) {
                inputElements[currentIndex + 1].focus();
            } else {
                this.handleLogin();
            }
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='col-12 text-center text-login'>WELCOME!</div>
                    <input type="text" className='form-control_username'
                        placeholder='Username' value={this.state.username}
                        onChange={(event) => this.handleOnChangeUsername(event)}
                        onKeyDown={this.handleKeyDown} />

                    <input type={this.state.isShowPassword ? 'text' : "password"} className='form-control_password'
                        placeholder='Password' value={this.state.password}
                        onChange={(event) => this.handleOnChangePassword(event)}
                        onKeyDown={this.handleKeyDown} />
                    <span onClick={() => { this.handleShowHidePassword() }}>
                        <i className={this.state.isShowPassword ? "far fa-eye-slash" : "far fa-eye"}></i>
                    </span>
                    <div className='col-12 text-center message' style={{ color: "red" }}>
                        {this.state.message}
                    </div>
                    <div className='col-12'>
                        <button className='btn-login' onClick={() => { this.handleLogin() }}>LOGIN</button>
                    </div>
                    <div className='col-12 text-center forgot-password'>Forgot password?</div>

                </div>
                <div className='login-background2'> </div>
                <div className='col-12 text-center title'>NHÀ SÁCH ABC</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        languge: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);