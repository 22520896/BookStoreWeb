import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Sach.scss'
import sachService from "../../services/sachService"
class Sach extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="text-center">
                Sach
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

export default connect(mapStateToProps, mapDispatchToProps)(Sach);
