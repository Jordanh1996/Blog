import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { startDispatchRemoveBlog } from '../actions/myblogs';
import { getBlogById } from '../axios/blog';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

class Blog extends React.Component {

    state = {
        modalopen: false,
        blog: null,
    }


    componentWillMount() {
        getBlogById(this.props.match.params.id).then((res) => {
            this.setState(() => ({ blog: res.data.resblog }));
        });
    }

    openModal = () => {
        this.setState(() => ({ modalopen: true }));
    }

    closeModal = () => {
        this.setState(() => ({ modalopen: false }));
    }

    confirmRemove = () => {
        this.closeModal();
        this.props.removeBlog(this.props.match.params.id, this.state.blog.image)
            .then(() => {
                this.props.history.push('/');
            });
    }

    render() {
        return (
            <div className="content__divide">
                {
                    this.state.blog ?
                        <Card
                            style={{
                                margin: '1rem'
                            }}
                        >
                            <CardHeader
                                title={this.state.blog.title}
                                titleStyle={{
                                    fontSize: '3.6rem',
                                    wordBreak: 'break-all'
                                }}
                                subtitle={`Posted by ${this.state.blog.creatorUsername}, ${
                                    moment().unix() * 1000 - this.state.blog.createdAt > 2246400000 ?
                                        `${moment(this.state.blog.createdAt).format('MMMM Do YYYY')}` :
                                        `${moment(this.state.blog.createdAt).fromNow()}`}`
                                }
                            />

                            <CardText
                                style={{
                                    wordBreak: 'break-all'
                                }}
                            >
                                <p className="blog__content">{this.state.blog.content}</p>
                                {
                                    this.state.blog.image ?
                                        <img
                                            src={
                                                `https://s3-eu-west-1.amazonaws.com/blog-jordan/${this.state.blog.image}`
                                            }
                                            className="blog__image"
                                        /> :
                                        null
                                }
                                {
                                    this.state.blog.edited ?
                                        <p className='blog__edited'>Last Edited : {(moment().unix() * 1000 - this.state.blog.updatedAt > 2246400000 ?
                                            `${moment(this.state.blog.updatedAt).format('MMMM Do YYYY')}` :
                                            `${moment(this.state.blog.updatedAt).fromNow()}`)}</p> :
                                        ''
                                }
                            </CardText>

                            <CardActions>
                                {
                                    this.state.blog.creatorUsername === this.props.user ?
                                        <div>
                                            <RaisedButton
                                                label="Edit"
                                                primary
                                                containerElement={<Link
                                                    to={`edit/${this.state.blog.id}`}
                                                />}
                                            />

                                            <RaisedButton
                                                label="Remove"
                                                secondary
                                                onClick={this.confirmRemove}
                                                style={{
                                                    marginLeft: '1rem'
                                                }}
                                            />
                                        </div>
                                        : ''
                                }
                            </CardActions>
                        </Card> :
                        <img className='image-register' src='/images/loader.gif' />
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user.username
});

const mapDispatchToProps = (dispatch) => ({
    removeBlog: (id, image) => dispatch(startDispatchRemoveBlog(id, image))
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
