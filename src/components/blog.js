import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import RemoveModal from './removeModal';
import {startDispatchGetBlog} from '../actions/blog';

class Blog extends React.Component {

    state = {
        modalopen: false
    }


    componentWillMount() {
        if (!this.props.blog) {
            this.props.dispatchGetBlog(this.props.match.params.id)
        }
    }

    openModal = () => {
        this.setState(() => ({modalopen: true}))
    }

    closeModal = () => {
        this.setState(() => ({modalopen: false}))
    }

    confirmRemove = () => {
        this.closeModal()
        axios({
            method: "delete",
            url: `https://blogserver-jordan.herokuapp.com/blog/${this.props.match.params.id}`,
            headers: {'x-auth': this.props.user.token}
        }).then(() => {
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div>
            <Header />
            {
                this.props.blog ?
                <div>
                    {this.props.blog._creatorUser} : 
                    {this.props.blog.title}
                        
                    {this.props.blog.content}
                    {
                        this.props.blog._creatorUser === this.props.user.username ?
                        <div>
                            <Link to={`edit/${this.props.blog._id}`}>
                                Edit
                            </Link>
                            <button onClick={this.openModal}>
                                Remove
                            </button>
                            <RemoveModal
                                isopen={this.state.modalopen}
                                isclose={this.closeModal}
                                confirmRemove={this.confirmRemove}
                            />
                        </div>
                        : <p></p>
                    }
                </div>
                :
                <img className='image-register' src='/images/loader.gif' />
            }

            </div>
        )
    }
}
    



const mapStateToProps = (state, props) => {
    return {
        blog: state.blogs.find((blog) => blog._id === props.match.params.id),
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchGetBlog: (id) => dispatch(startDispatchGetBlog(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);