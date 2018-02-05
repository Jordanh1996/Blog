import React from 'react';
import {connect} from 'react-redux';
import BlogForm from './blogForm';
import Header from './header';
import {DispatchAddBlog} from '../actions/blog';


class AddBlog extends React.Component {

    onSubmit = (title, content) => {
        this.props.onSubmit(title, content)
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Header />
                <BlogForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (title, content) => dispatch(DispatchAddBlog(title, content))
    }
}

export default connect(undefined, mapDispatchToProps)(AddBlog);