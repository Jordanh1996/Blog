import React from 'react';
import Waypoint from 'react-waypoint';
import BlogItem from './blogitem';


class BlogList extends React.Component {

    render() {
        return (
            <div className="content-container__bloglist">
            {  
                this.props.blogs ?
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
                }) :
                null
            }
            {
                this.props.loading ?
                <div className='blog__loading'>
                    Loading Blogs...
                    <img className='loader__image' src='/images/loader.gif' />
                </div>
                :
                null
            }
            <Waypoint
                onEnter={this.props.bottom}
            />
            <div className="bottom" ref="bottom" />
        </div>
        );
    }
}

export default BlogList;
