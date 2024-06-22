import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './PhieuNhap.scss'
import phieuNhapService from '../../services/phieuNhapService'
class PhieuNhap extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="text-center">
                PhieuNhap
            </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(PhieuNhap);
