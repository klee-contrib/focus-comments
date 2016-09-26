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
    currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showAvatar: PropTypes.bool
}

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
    }
    
    getDefaultProps() {
        return {
            showAvatar: true
        };
    }
    
    componentWillReceiveProps({isLoading}) {
        if (isLoading === false && this.props.isLoading === true && this.state.isEditing) {
            this.setState({isEditing: false});
        }
    }

    render() {
        const {msg, author, authorDisplayName, creationDate, currentUserId, lastModified, userPictureResolver, texts,showAvatar, ...otherProps} = this.props;
        const {isEditing} = this.state;
        const isMine = currentUserId === author;
        return (
            <div data-focus='comment' data-editing={isEditing}>
                {showAvatar &&
                    <div data-focus='avatar'>
                        <i className='material-icons'>account_circle</i>
                        <img src={userPictureResolver(author)}/>
                    </div>
                }
                <div data-focus='content'>
                    <div data-focus='head'>
                        <div data-focus='name'>
                            <b>{authorDisplayName}</b>
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
                        {isMine && isEditing ? <Input inputType='update' texts={{...texts, placeholder: ''}} {...{author, authorDisplayName, creationDate, ...otherProps}} ref='edit' value={msg}/> : <div dangerouslySetInnerHTML={{__html: msg.replace(/\n/g, '<br>')}}></div>}
                    </div>
                    <div className='separator'></div>
                </div>
            </div>
        );
    }
}

Comment.propTypes = propTypes;

export default Comment;
