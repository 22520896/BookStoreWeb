import React, { Component } from 'react';
import * as faIcons from "react-icons/fa"
import { connect } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai"
import { Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import './Header.scss'
import * as actions from "../../store/actions";



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: false,
            activeItem: "",
            vaiTro: ['Admin', 'Thủ Kho', 'Nhân Viên Bán Hàng']
        }
    }

    componentDidMount() {
        this.setState({
            activeItem: window.location.pathname
        })
    }

    showSidebar = () => {
        this.setState(
            {
                sidebar: !this.state.sidebar
            });
    };

    setActiveItem = (path) => {
        this.setState({ activeItem: path });
    };

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <>
                <div className='navbar'>
                    <div>
                        <Link to="#" className='menu-bars'>
                            <faIcons.FaBars onClick={this.showSidebar} />
                        </Link>
                    </div>

                    <div className='right-menu'>
                        <span className='welcome'>Xin chào, {userInfo && userInfo.hoTen ? userInfo.hoTen : ""}!</span>
                        {/* nút logout */}
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                </div>
                <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <span className='navbar-toggle'>
                        <Link to="#" className='menu-bars'>
                            <AiOutlineClose onClick={this.showSidebar} />
                        </Link>
                    </span>
                    <div className='nav-menu-items'>
                        <div>
                            {Sidebar[userInfo.vaiTro].map((item, index) => {
                                return (
                                    <div key={index} className={`${item.cName} ${this.state.activeItem === item.path ? 'active' : ''}`} onClick={this.showSidebar} >
                                        <Link to={item.path} onClick={() => this.setActiveItem(item.path)}>
                                            <span className='item-title' >{item.title}</span>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </nav>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
