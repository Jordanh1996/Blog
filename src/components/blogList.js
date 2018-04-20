import React from 'react';
import Waypoint from 'react-waypoint';
import BlogItem from './blogitem';

class BlogList extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.props.getBlogs().then((res) => {
            this.setState(() => ({ loading: false }));
        });
    }

    bottom = () => {
        if (this.props.blogs.length > 0 && !this.state.loading) {
            this.setState(() => ({ loading: true }));
            this.props.getBlogs(this.props.blogs).then(() => {
                this.setState(() => ({ loading: false }));
            });
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
                        editTime={blog.editTime}
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
                <div className="bottom" ref="bottom" />
            </div>
        );
    }
}

export default BlogList;
