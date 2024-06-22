import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HoaDon.scss'
import hoaDonService from '../../services/hoaDonService.js'
class HoaDon extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="text-center">
                HoaDon
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

export default connect(mapStateToProps, mapDispatchToProps)(HoaDon);
