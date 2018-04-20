import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BlogForm from './blogForm';
import { DispatchEditBlog } from '../actions/blog';
import { EditBlog } from '../axios/blog';
import { DispatchEditMyBlog } from '../actions/myblogs';

class EditPage extends React.Component {

    state = {
        err: false,
        redirect: false
    }

    onSubmit = (token, title, content) => {
        EditBlog(token, this.props.match.params.id, title, content).then(() => {
            this.props.dispatchEditBlog(this.props.match.params.id, title, content);
            this.props.dispatchEditMyBlog(this.props.match.params.id, title, content);
            this.setState(() => ({ redirect: true }));
        }).catch(() => {
            this.setState(() => ({ err: true }));
        });
    }

    render() {
        return (
            <div className="content__divide">
                <BlogForm
                    blog={this.props.blog}
                    onSubmit={this.onSubmit}
                />
                {
                    this.state.err ?
                    <p>an error occured when trying to edit your blog</p> :
                    <p></p>
                }
                {
                    this.state.redirect ?
                    <Redirect to={`/blog/${this.props.match.params.id}`} /> :
                    <p></p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.find((blog) => blog._id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchEditBlog: (id, title, content) => dispatch(DispatchEditBlog(id, title, content)),
        dispatchEditMyBlog: (id, title, content) => dispatch(DispatchEditMyBlog(id, title, content))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
