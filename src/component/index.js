import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import List from './list';

class Container extends Component {
    render() {
        const {comments, dispatch, isLoading, ...otherProps} = this.props;
        return (
            <List comments={comments} dispatch={dispatch} {...otherProps}/>
        );
    }
}

const select = ({comments, isLoading, isPosting, lastUpdate}) => {
    return {comments, isLoading, isPosting, lastUpdate};
}

export default connect(select)(Container);
