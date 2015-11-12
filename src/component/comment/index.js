import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import moment from 'moment';
import Input from '../input';

const propTypes = {
    uuid: PropTypes.string.isRequired,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    msg: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    lastModified: PropTypes.string.isRequired,
    authorDisplayName: PropTypes.string.isRequired,
    userPictureResolver: PropTypes.func.isRequired,
    currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
    }

    componentWillReceiveProps({isLoading}) {
        if (isLoading === false && this.props.isLoading === true && this.state.isEditing) {
            this.setState({isEditing: false});
        }
    }

    componentDidUpdate() {
        const {isEditing} = this.state;
        if (isEditing) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.edit.refs.textarea));
        }
    }

    render() {
        const {msg, author, authorDisplayName, creationDate, currentUserId, lastModified, userPictureResolver, texts, ...otherProps} = this.props;
        const {isEditing} = this.state;
        const isMine = currentUserId === author;
        return (
            <div data-focus='comment'>
                <img data-focus='avatar' src={userPictureResolver(author)}/>
                <div data-focus='content'>
                    <div data-focus='head'>
                        <div data-focus='name'>
                            {authorDisplayName}
                        </div>
                        {isMine &&
                            <div data-focus='edit'>
                                <a data-focus='toggle' onClick={() => {this.setState({isEditing: !this.state.isEditing})}}>
                                    {isEditing ? texts.cancel : texts.edit}
                                </a>
                            </div>
                        }
                        <div data-focus='date'>
                            {moment(creationDate).fromNow()}
                        </div>
                    </div>
                    <div data-focus='body'>
                        {isMine && isEditing ? <Input inputType='update' texts={{...texts, placeholder: ''}} {...{author, authorDisplayName, creationDate, ...otherProps}} ref='edit' value={msg}/> : msg}
                    </div>
                </div>
            </div>
        );
    }
}

Comment.propTypes = propTypes;

export default Comment;
