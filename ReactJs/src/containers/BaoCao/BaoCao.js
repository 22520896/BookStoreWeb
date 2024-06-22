import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './BaoCao.scss'
import baoCaoService from '../../services/baoCaoService.js'
class BaoCao extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="text-center">
                BaoCao
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

export default connect(mapStateToProps, mapDispatchToProps)(BaoCao);
