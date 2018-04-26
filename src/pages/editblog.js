import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BlogForm from '../components/blogForm';
import { startDispatchEditBlog } from '../actions/myblogs';
import { getBlogById } from '../axios/blog';

class EditPage extends React.Component {

    state = {
        err: false,
        blog: null,
        redirect: false,
        loading: true
    }

    componentWillMount() {
        getBlogById(this.props.match.params.id).then((res) => {
            this.setState(() => ({ 
                blog: res.data.resblog, 
                loading: false
            }));
        });
    }

    onSubmit = (title, content, image, imageChanged) => {
        this.props.editBlog(this.props.match.params.id, title, content, image, imageChanged).then(() => {
            this.setState(() => ({ redirect: true }));
        }).catch(() => {
            this.setState(() => ({ err: true }));
        });
    }

    render() {
        return (
            <div className="content__divide">
                {
                    !this.state.loading ?
                    <BlogForm
                        blog={this.state.blog}
                        onSubmit={this.onSubmit}
                    /> :
                    <img src='/images/loader.gif' className='image-register' />
                }
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
        editBlog: (id, title, content, image, imageChanged) => dispatch(startDispatchEditBlog(id, title, content, image, imageChanged))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
