import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Collection.scss'
class Collection extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="text-center">
                Collection
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

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
