import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import List from './list';
import Input from './input';
import './style.scss';

const propTypes = {
    apiRootUrl: PropTypes.string.isRequired,
    concept: PropTypes.string.isRequired,
    conceptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    userPictureResolver: PropTypes.func.isRequired
}

const defaultProps = {
    userPictureResolver: userId => `./x/account/api/accounts/${userId}/photo`
}

class Container extends Component {
    render() {
        const {comments, dispatch, isLoading, ...otherProps} = this.props;
        return (
            <div data-focus='comments-extension'>
                <List comments={comments} dispatch={dispatch} {...otherProps}/>
                <Input dispatch={dispatch} isLoading={isLoading} {...otherProps}/>
            </div>
        );
    }
}

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

const select = ({comments, isLoading, lastUpdate}) => {
    return {comments, isLoading, lastUpdate};
}

export default connect(select)(Container);
