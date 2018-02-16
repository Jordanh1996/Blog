import React from 'react';
import {connect} from 'react-redux';
import BlogItem from './blogitem';
import {startDispatchSetBlogs, DispatchSetBlogs, DispatchConcatBlogs} from '../actions/blog';


class BlogList extends React.Component {

    state = {
        loading: false
    }

    componentDidMount() {
        this.props.dispatchSetBlogs(15).then((res) => {
            this.props.SetBlogs(res.data.resblog.reverse())
            document.addEventListener('scroll', this.trackScrolling);
        })
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling)
    }

    trackScrolling = () => {
        if (this.isBottom(this.refs.bottom) && this.props.blogs[this.props.blogs.length - 1].index > 1) {
            this.setState(() => ({loading: true}))
            document.removeEventListener('scroll', this.trackScrolling)
            this.props.dispatchSetBlogs(10, this.props.blogs[this.props.blogs.length - 1].index - 1).then((res) => {
                this.props.ConcatBlogs(res.data.resblog.reverse())
                document.addEventListener('scroll', this.trackScrolling)
            })
        }
    };


    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
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
                {
                    this.state.loading ?
                    <div>
                        Loading Blogs...
                        <img className='image-register' src='/images/loader.gif' />
                    </div>
                    :
                    <p></p>
                }
                <div className="bottom" id="bottom" ref="bottom">

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
        dispatchSetBlogs: (amount, end) => dispatch(startDispatchSetBlogs(amount, end)),
        SetBlogs: (blogs) => dispatch(DispatchSetBlogs(blogs)),
        ConcatBlogs: (blogs) => dispatch(DispatchConcatBlogs(blogs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);