import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import List from './list';

const propTypes = {
    apiRootUrl: PropTypes.string.isRequired,
    concept: PropTypes.string.isRequired,
    conceptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

class Container extends Component {
    render() {
        const {comments, dispatch, isLoading, ...otherProps} = this.props;
        return (
            <List comments={comments} dispatch={dispatch} {...otherProps}/>
        );
    }
}

Container.propTypes = propTypes;

const select = ({comments, isLoading, isPosting, lastUpdate}) => {
    return {comments, isLoading, isPosting, lastUpdate};
}

export default connect(select)(Container);
