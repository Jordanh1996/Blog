import React from 'react';
import { connect } from 'react-redux';
import BlogForm from '../components/blogForm';
import { addBlog } from '../axios/blog';
import { DispatchAddBlog } from '../actions/myblogs';


class AddBlog extends React.Component {

    state = {
        error: undefined
    }

    onSubmit = (token, title, content) => {
        addBlog(token, title, content).then((res) => {
            this.props.dispatchAddBlog(title, content, res.data._id);
            this.props.history.push('/');
            }).catch(() => {
                this.setState(() => ({ error: true }));
            });
    }

    render() {
        return (
            <div className="content__divide">
                    <BlogForm 
                        onSubmit={this.onSubmit}
                    />
                        {this.state.error && <p>there was an error posting your blog</p>}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddBlog: (title, content, id) => dispatch(DispatchAddBlog(title, content, id))
    };
};

export default connect(undefined, mapDispatchToProps)(AddBlog);
