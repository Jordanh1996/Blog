import React from 'react';
import BlogList from './blogList';

class LatestBlogs extends React.Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.props.getBlogs().then(() => {
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
            <BlogList 
                blogs={this.props.blogs}
                bottom={this.bottom}
                loading={this.state.loading}
            />
        );
    }
}

export default LatestBlogs;
