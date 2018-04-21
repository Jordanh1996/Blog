import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BlogForm from '../components/blogForm';
import { startDispatchEditBlog } from '../actions/myblogs';

class EditPage extends React.Component {

    state = {
        err: false,
        redirect: false
    }

    onSubmit = (title, content) => {
        this.props.editBlog(this.props.match.params.id, title, content).then(() => {
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
        editBlog: (id, title, content) => dispatch(startDispatchEditBlog(id, title, content))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
