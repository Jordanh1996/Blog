import React from 'react';
import {getBlogsByTitle, getBlogsByUsername} from '../axios/blog';
import BlogItem from './blogitem';
import { setTimeout, clearTimeout } from 'timers';


class SearchBlogs extends React.Component {

    state = {
        selected: 'title',
        text: '',
        blogs: [],
        timeout: undefined,
        loading: false
    }

    onType = () => {
        if (this.state.selected === 'title') {
            return this.setState(() => ({selected: 'username'}))
        }
        this.setState(() => ({selected: 'title'}))
    }
    
    Check = (text) => {
        if (this.state.selected === 'title') {
            return getBlogsByTitle(text)
        } else if (this.state.selected === 'username') {
            return getBlogsByUsername(text)
        }
    }

    onText = (e) => {
        clearTimeout(this.state.timeout)
        this.setState(() => ({loading: true}))
        const text = e.target.value
        this.setState(() => ({text}))
        this.setState(() => ({timeout: setTimeout(() => {
            if (this.state.text !== '') {
                return this.Check(text).then((res) => {
                    this.setState(() => ({blogs: res.data.resblog, loading: false}))
                })
            }
            this.setState(() => ({loading: false}))
        }, 500)}))
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.onType}
                    disabled={this.state.selected === 'title'}
                >
                    By Title
                </button>

                <button
                    onClick={this.onType}
                    disabled={this.state.selected === 'username'}
                >
                    By Username
                </button>

                <input
                    type="text"
                    value={this.state.text}
                    onChange={this.onText}
                />
                {
                    this.state.loading ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    <p></p>
                }
                {
                    this.state.blogs.map((blog) => {
                        return <BlogItem
                            title={blog.title}
                            content={blog.content}
                            id={blog._id}
                            key={blog._id}
                        /> 
                    })
                }
            </div>
        )
    }
}


export default SearchBlogs;