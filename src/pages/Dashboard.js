import React from 'react';
import { connect } from 'react-redux';
import LatestBlogs from '../components/latestBlogs';
import { startDispatchSetBlogs, dispatchRemoveBlogs } from '../actions/blog';

class Dashboard extends React.Component {

    componentWillMount() {
        this.props.removeBlogs();
    }

    render() {
        return (
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
                <LatestBlogs 
                    getBlogs={this.props.getBlogs}
                    blogs={this.props.blogs}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    blogs: state.blogs
});

const mapDispatchToProps = (dispatch) => ({
    getBlogs: (blogs) => dispatch(startDispatchSetBlogs(blogs)),
    removeBlogs: () => dispatch(dispatchRemoveBlogs())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
