import React from 'react';
import {connect} from 'react-redux';
import BlogForm from './blogForm';
import Header from './header';
import {startDispatchAddBlog} from '../actions/blog';


class AddBlog extends React.Component {

    state = {
        error: undefined
    }

    onSubmit = (token, title, content) => {
        this.props.onSubmit(token, title, content).then(() => {
            this.props.history.push('/')
            }).catch(() => {
                this.setState(() => ({error: true}))
            })
    }

    render() {
        return (
            <div>
                <Header />
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
        onSubmit: (token, title, content) => dispatch(startDispatchAddBlog(token, title, content))
    }
}

export default connect(undefined, mapDispatchToProps)(AddBlog);