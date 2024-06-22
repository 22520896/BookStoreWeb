import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './PhieuThu.scss'
import phieuThuService from '../../services/phieuThuService'
class PhieuThu extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="text-center">
                PhieuThu
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

export default connect(mapStateToProps, mapDispatchToProps)(PhieuThu);
