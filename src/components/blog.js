import React from 'react';
import {connect} from 'react-redux';
import Header from './header';

const blog = (props) => (
    <div>
        <Header />
        {props.blog._creatorUser} : 
        {props.blog.title}
            
        {props.blog.content}
    </div>
)

const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.find((blog) => blog._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(blog);