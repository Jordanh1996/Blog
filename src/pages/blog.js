import React from 'react';
import { connect } from 'react-redux';
import CardItem from '../components/cardItem';
import MessageForm from '../components/messageForm';
import { startDispatchRemoveBlog } from '../actions/myblogs';
import { addMessage, editMessage, removeMessage, getMessagesByBlogId } from '../axios/message';
import { getBlogById } from '../axios/blog';


class Blog extends React.Component {

    state = {
        blog: null,
        messages: null
    }


    componentWillMount() {
        getBlogById(this.props.match.params.id).then((res) => {
            this.setState(() => ({ blog: res.data.resblog }));
        });
        getMessagesByBlogId(this.props.match.params.id).then((res) => {
            this.setState(() => ({ messages: res.data }));
        });
    }

    removeBlog = () => {
        this.props.removeBlog(this.props.match.params.id, this.state.blog.image)
            .then(() => {
                this.props.history.push('/');
            });
    }

    onMessageSubmit = (content, edit) => {
        if (edit) {
            return editMessage(this.props.user.token, edit, content).then(() => {
                this.setState((prevState) => ({
                    messages: prevState.messages.map((message) => {
                        if (message.id === edit) {
                            return {
                                ...message,
                                content,
                                updatedAt: new Date()
                            };
                        }
                        return message;
                    })
                }));
            });
        }
        addMessage(this.props.user.token, content, this.state.blog.id).then((res) => {
            this.setState((prevState) => ({ messages: [...prevState.messages, res.data.message] }));
        });
    }

    onStartEditMessage = (content, id) => {
        this.refs.messageForm.openEditModal(content, id);
    }

    removeMessage = (id) => {
        removeMessage(this.props.user.token, id).then(() => {
            this.setState((prevState) => ({
                messages: prevState.messages.filter((message) => id != message.id)
            }));
        });
    }

    render() {
        return (
            <div className="content__divide">
                {
                    this.state.blog ?
                        <CardItem
                            item={this.state.blog}
                            user={this.props.user.username}
                            confirmRemove={this.removeBlog}
                            link
                        /> :
                        <img className='image-register' src='/images/loader.gif' />
                }
                {
                    this.state.messages ?
                        this.state.messages.map((message) => <CardItem
                            key={message.id}
                            item={message}
                            user={this.props.user.username}
                            onEdit={this.onStartEditMessage}
                            confirmRemove={this.removeMessage}
                        />) :
                        null
                }
                {
                    this.state.blog ?
                        this.props.user.username ?
                            <MessageForm
                                ref='messageForm'
                                onMessageSubmit={this.onMessageSubmit}
                            /> :
                            'Please Sign in to add a message' :
                        null
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    removeBlog: (id, image) => dispatch(startDispatchRemoveBlog(id, image))
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
