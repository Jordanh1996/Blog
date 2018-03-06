import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Remove} from '../axios/blog';
import RemoveModal from './removeModal';
import {DispatchSetBlogs} from '../actions/blog';
import {getBlogById} from '../axios/blog';
import {DispatchRemoveBlog} from '../actions/myblogs';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Blog extends React.Component {

    state = {
        modalopen: false
    }


    componentWillMount() {
        if (!this.props.blog) {
            getBlogById(this.props.match.params.id).then((res) => {
                this.props.dispatchSetBlog([res.data.resblog])
            })
        }
    }

    openModal = () => {
        this.setState(() => ({modalopen: true}))
    }

    closeModal = () => {
        this.setState(() => ({modalopen: false}))
    }

    confirmRemove = () => {
        this.closeModal()
        Remove(this.props.match.params.id, this.props.user.token)
        .then(() => {
            this.props.dispatchRemoveBlog(this.props.blog._id)
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div className="content__divide">
                {
                    this.props.blog ?
                    <Card
                        style={{
                            'margin': '1rem'
                        }}
                    >
                    <CardHeader
                        title={this.props.blog.title}
                        titleStyle={{
                            'fontSize': '3.6rem',
                            'wordBreak': 'break-all'
                        }}
                        subtitle={`Created by ${this.props.blog._creatorUser}`}
                    />

                    <CardText
                        style={{
                            'wordBreak': 'break-all'
                        }}
                    >
                        <p className="blog__content">{this.props.blog.content}</p>
                    </CardText>

                    <CardActions>
                        {
                            this.props.blog._creatorUser === this.props.user.username ?
                                <div>
                                    <RaisedButton
                                        label="Edit"
                                        primary={true}
                                        containerElement={<Link to={`edit/${this.props.blog._id}`}></Link>}
                                    />
                                    
                                    <RaisedButton
                                        label="Remove"
                                        secondary={true}
                                        onClick={this.confirmRemove}
                                        style={{
                                            'marginLeft': '1rem'
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
        )
    }
}

    



const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.find((blog) => blog._id === props.match.params.id),
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetBlog: (blog) => dispatch(DispatchSetBlogs(blog)),
        dispatchRemoveBlog: (id) => dispatch(DispatchRemoveBlog(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);