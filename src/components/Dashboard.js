import React from 'react';
import { connect } from 'react-redux';
import BlogList from './blogList';
import { startDispatchSetBlogs } from '../actions/blog';

const Dashboard = (props) => (
    <div className="content__divide">
        <div className="dashboard__divide-header">
            <div className="dashboard__title">
                Welcome
            </div>
            <div className="dashboard__title-sub">
                Store and Share your Documents online
            </div>
            <div className="dashboard__title-desc">
                Scroll down to browse the latest blogs
            </div>
        </div>
        <BlogList 
            getBlogs={props.getBlogs}
            blogs={props.blogs}
        />
    </div>
);

const mapStateToProps = (state) => ({
    blogs: state.blogs
});

const mapDispatchToProps = (dispatch) => ({
    getBlogs: (blogs) => dispatch(startDispatchSetBlogs(blogs))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
