import React from 'react';
import {connect} from 'react-redux';
import Header from './header';

const blog = (props) => (
    <div>
        <Header />
        {props.blog.title}
            sdfsdf
        {props.blog.content}
    </div>
)

const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.find((blog) => blog.id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(blog);