import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Login from './Login/Login.js';
import Header from './Header/Header';
import Home from './Home/Home'

import Sach from './Sach/Sach.js';
import TaiKhoan from './TaiKhoan/TaiKhoan.js';
import PhieuThu from './PhieuThu/PhieuThu.js';
import KhachHang from './KhachHang/KhachHang.js';
import PhieuNhap from './PhieuNhap/PhieuNhap.js';
import HoaDon from './HoaDon/HoaDon.js';
import BaoCao from './BaoCao/BaoCao.js';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';

class App extends Component {

    handlePersistorState = () => {
        const { persistor, isLoggedIn } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            persistor.purge()
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    {this.props.isLoggedIn && <Header />}
                    <span className="content-container">
                        <Switch>
                            <Route path={path.HOME} exact component={(Home)} />
                            <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                            <Route path={path.KHACHHANG} component={userIsAuthenticated(KhachHang)} />
                            <Route path={path.TAIKHOAN} component={userIsAuthenticated(TaiKhoan)} />
                            <Route path={path.PHIEUTHU} component={userIsAuthenticated(PhieuThu)} />
                            <Route path={path.HOADON} component={userIsAuthenticated(HoaDon)} />
                            <Route path={path.PHIEUNHAP} component={userIsAuthenticated(PhieuNhap)} />
                            <Route path={path.SACH} component={userIsAuthenticated(Sach)} />
                            <Route path={path.BAOCAO} component={userIsAuthenticated(BaoCao)} />
                        </Switch>
                    </span>

                    <ToastContainer
                        // className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                        // autoClose={false} hideProgressBar={true} pauseOnHover={false}
                        // pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                        // closeButton={<CustomToastCloseButton />}
                    />
                    {/* </div> */}
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);