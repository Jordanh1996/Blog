import React from 'react';
import BlogList from './blogList';

const Dashboard = () => (
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
        <BlogList />
    </div>
);

export default Dashboard;
