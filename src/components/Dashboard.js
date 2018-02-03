import React from 'react';
import {connect} from 'react-redux';
import Header from './header';
import BlogList from './blogList';

const Dashboard = (props) => (
    <div>
        <Header />
        <BlogList />
    </div>
)

const mapStateToProps = (state) => {
    return {
        blogs: state
    }
}

export default connect(mapStateToProps)(Dashboard)