import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Sell.scss'
class Sell extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="text-center">
                Sell
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

export default connect(mapStateToProps, mapDispatchToProps)(Sell);
