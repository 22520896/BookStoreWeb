import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Home.scss'
class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/' : '/login';

        return (
            <>
                <Redirect to={linkToRedirect} />
                <div className='home-body-container'>
                    <div className='img'></div>
                    <div className='background_1'></div>
                    <div className='background_2'></div>
                </div>
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn 
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);