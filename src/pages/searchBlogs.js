import React from 'react';
import { connect } from 'react-redux';
import { startDispatchSetBlogs, dispatchRemoveBlogs } from '../actions/blog';
import BlogList from '../components/blogList';
import { setTimeout, clearTimeout } from 'timers';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';


class SearchBlogs extends React.Component {

    state = {
        username: '',
        title: '',
        timeout: undefined,
        loading: false,
        noResults: false
    }

    componentWillMount() {
        this.props.removeBlogs();
    }

    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({ username }));
        this.onText(username, this.state.title);
    }

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
        this.onText(this.state.username, title);
    }

    onText = (username, title) => {
        clearTimeout(this.state.timeout);
        if (username !== '' || title !== '') {
            this.setState(() => ({ timeout: setTimeout(() => {
                this.setState(() => ({ loading: true }));
                this.props.getBlogs(undefined, username, title).then(() => {
                    if (this.props.blogs.length < 1) {
                        return this.setState(() => ({ 
                            noResults: true,
                            loading: false
                        }));
                    }
                    this.setState(() => ({ 
                        noResults: false,
                        loading: false
                    }));
                });
            }, 800) }));
        }
    }

    bottom = () => {
        if (this.props.blogs.length > 0 && !this.state.loading) {
            this.setState(() => ({ loading: true }));
            this.props.getBlogs(this.props.blogs, this.state.username, this.state.title).then(() => {
                this.setState(() => ({ loading: false }));
            });
        }
    }

    render() {
        return (
            <div className="content__divide">
                <Card
                    className="search__card"
                >
                    <CardText
                        className="search__card-content"
                    >
                        <p className="search__title">Search</p>
                        <div className="search__textFields">
                            <TextField
                                type="text"
                                hintText="Username"
                                floatingLabelText="Username"
                                value={this.state.username}
                                onChange={this.onUsernameChange}
                            />
                            <TextField
                                type="text"
                                hintText="Title"
                                floatingLabelText="Title"
                                value={this.state.title}
                                onChange={this.onTitleChange}
                            />
                        </div>
                        {
                            this.state.noResults ?
                            <p className="search__noResults">
                                There are no results for this query
                            </p> :
                            null
                        }
                    </CardText>
                </Card>

                <BlogList
                    blogs={this.props.blogs}
                    bottom={this.bottom}
                    loading={this.state.loading}
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    blogs: state.blogs
});

const mapDispatchToProps = (dispatch) => ({
    getBlogs: (blogs, username, title) => dispatch(startDispatchSetBlogs(blogs, username, title)),
    removeBlogs: () => dispatch(dispatchRemoveBlogs())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlogs);
