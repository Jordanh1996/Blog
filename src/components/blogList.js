import React from 'react';
import {connect} from 'react-redux';
import BlogItem from './blogitem';

const BlogList = (props) => (
    <div>
        {
            props.blogs.length === 0 ? <p>there are no blogs</p> :
            props.blogs.map((blog) => {
            return <BlogItem
                title={blog.title}
                content={blog.content}
                id={blog.id}
                key={blog.id}
            />
        })}
    </div>
)

const mapStateToProps = (state) => {
    return {
        blogs: state
    }
}

export default connect(mapStateToProps)(BlogList);