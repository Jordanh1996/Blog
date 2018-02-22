import React from 'react';
import {connect} from 'react-redux';
import BlogForm from './blogForm';
import Header from './header';
import {addBlog} from '../axios/blog';
import {DispatchAddBlog} from '../actions/myblogs';


class AddBlog extends React.Component {

    state = {
        error: undefined
    }

    onSubmit = (token, title, content) => {
        addBlog(token, title, content).then(() => {
            this.props.dispatchAddBlog(title, content)
            this.props.history.push('/')
            }).catch(() => {
                this.setState(() => ({error: true}))
            })
    }

    render() {
        return (
            <div>
                <BlogForm 
                    onSubmit={this.onSubmit}
                />
                {this.state.error && <p>there was an error posting your blog</p>}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAddBlog: (title, content) => dispatch(DispatchAddBlog(title, content))
    }
}

export default connect(undefined, mapDispatchToProps)(AddBlog);