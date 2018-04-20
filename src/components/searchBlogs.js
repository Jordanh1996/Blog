import React from 'react';
import { getBlogsByTitle, getBlogsByUsername } from '../axios/blog';
import BlogItem from './blogitem';
import { setTimeout, clearTimeout } from 'timers';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class SearchBlogs extends React.Component {

    state = {
        selected: 'Title',
        text: '',
        blogs: [],
        timeout: undefined,
        loading: false
    }

    onType = () => {
        if (this.state.selected === 'Title') {
            return this.setState(() => ({ selected: 'Username', text: '' }));
        }
        this.setState(() => ({ selected: 'Title', text: '' }));
    }

    onText = (e) => {
        clearTimeout(this.state.timeout);
        this.setState(() => ({ loading: true }));
        const text = e.target.value;
        this.setState(() => ({ text }));
        this.setState(() => ({ timeout: setTimeout(() => {
            if (this.state.text !== '') {
                return this.check(text).then((res) => {
                    this.setState(() => ({ blogs: res.data.resblog, loading: false }));
                });
            }
            this.setState(() => ({ loading: false }));
        }, 500)
    }));
    }

    check = (text) => {
        if (this.state.selected === 'Title') {
            return getBlogsByTitle(text);
        } else if (this.state.selected === 'Username') {
            return getBlogsByUsername(text);
        }
    }

    render() {
        return (
            <div className="content__divide">
                <Card
                    style={{
                        margin: '1rem'
                    }}
                >
                    <CardText
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <p className="search__title">Search By {this.state.selected}</p>
                        <RaisedButton
                            onClick={this.onType}
                            primary
                            label={'Toggle Search Method'}
                        />

                        <br />

                        <TextField
                            type="text"
                            hintText={this.state.selected}
                            floatingLabelText={this.state.selected}
                            value={this.state.text}
                            onChange={this.onText}
                        />
                        <br />
                        {
                            this.state.loading ?
                            <img className='image-register' src='/images/loader.gif' /> :
                            <p></p>
                        }
                    </CardText>
                </Card>
                
                {
                    this.state.blogs.map((blog) => {
                        return <BlogItem
                            title={blog.title}
                            content={blog.content}
                            creator={blog._creatorUser}
                            id={blog._id}
                            key={blog._id}
                        /> 
                    })
                }
            </div>
        );
    }
}


export default SearchBlogs;
