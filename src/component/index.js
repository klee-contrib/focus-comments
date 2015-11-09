import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getComments} from '../actions';

class Container extends Component {
    render() {
        const {comments, dispatch, isLoading} = this.props;
        return (
            <div>
                <ul>
                    {comments.map(({msg}, idx) => {
                        return (
                            <li key={idx}>{msg}</li>
                        );
                    })}
                </ul>
                <button onClick={() => {dispatch(getComments('concept', 'id'));}}>Manually get the comments</button>
                {isLoading && <p>Loading the comments...</p>}
            </div>
        )
    }
}

const select = state => {
    return {
        comments: state.comments,
        isLoading: state.isLoading
    };
}

export default connect(select)(Container);
