import React from 'react';
import { connect } from 'react-redux';
import BlogForm from '../components/blogForm';
import { startDispatchAddBlog } from '../actions/myblogs';


class AddBlog extends React.Component {

    state = {
        error: undefined
    }

    onSubmit = (title, content, image, imageChanged) => {
        this.props.addBlog(title, content, image, imageChanged).then(() => {
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
        addBlog: (title, content, image, imageChanged) => dispatch(startDispatchAddBlog(title, content, image, imageChanged))
    };
};

export default connect(undefined, mapDispatchToProps)(AddBlog);
