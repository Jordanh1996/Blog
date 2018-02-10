import React from 'react';
import {connect} from 'react-redux';
import Header from './header';
import BlogList from './blogList';

const Dashboard = (props) => (
    <div>
        <Header />
        {
            props.username && <p>Welcome back, {props.username}</p>
        }
        <BlogList />
    </div>
)

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        username: state.user.username
    }
}

export default connect(mapStateToProps)(Dashboard)