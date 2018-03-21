import React from 'react';
import {connect} from 'react-redux';
import Waypoint from 'react-waypoint';
import BlogItem from './blogitem';
import {DispatchSetBlogs, DispatchConcatBlogs} from '../actions/blog';
import {getBlogs} from '../axios/blog';

class BlogList extends React.Component {

    state = {
        loading: false
    }

    componentDidMount() {
        getBlogs(5).then((res) => {
            this.props.SetBlogs(res.data.resblog)
            this.setState(() => ({loading: false}))
        })
    }

    bottom = () => {
        if (!this.state.loading) {
            this.setState(() => ({loading: true}))
            getBlogs(5, this.props.blogs[this.props.blogs.length - 1]._id)
            .then((res) => {
                if (res.data.resblog.length > 0) {
                    this.props.ConcatBlogs(res.data.resblog)
                }
                this.setState(() => ({loading: false}))
            })
        }

    }


    render() {
        return (
            <div className="content-container__bloglist">
                {
                    
                    this.props.blogs.map((blog) => {
                    return <BlogItem
                        title={blog.title}
                        content={blog.content}
                        creator={blog._creatorUser}
                        createdAt={blog._createdAt}
                        id={blog._id}
                        key={blog._id}
                    />
                })}
                {
                    this.state.loading ?
                    <div>
                        Loading Blogs...
                        <img className='loader__image' src='/images/loader.gif' />
                    </div>
                    :
                    <p></p>
                }
                <Waypoint
                    onEnter={this.bottom}
                />
                <div className="bottom" ref="bottom">

                </div>
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
        SetBlogs: (blogs) => dispatch(DispatchSetBlogs(blogs)),
        ConcatBlogs: (blogs) => dispatch(DispatchConcatBlogs(blogs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);