import React from 'react';
import {connect} from 'react-redux';
import BlogItem from './blogitem';
import {startDispatchSetBlogs} from '../actions/blog';


class BlogList extends React.Component {

    componentDidMount() {
        this.props.dispatchSetBlogs()
    }

    render() {
        return (
            <div>
                {
                    this.props.blogs.length === 0 ? 
                    <div>
                        Loading Blogs...
                        <img className='image-register' src='/images/loader.gif' />
                    </div>
                    :
                    this.props.blogs.map((blog) => {
                    return <BlogItem
                        title={blog.title}
                        content={blog.content}
                        id={blog._id}
                        key={blog._id}
                    />
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetBlogs: () => dispatch(startDispatchSetBlogs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);