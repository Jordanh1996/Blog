import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from './header';
import {startDispatchGetBlog} from '../actions/blog';

class Blog extends React.Component {


    componentWillMount() {
        if (!this.props.blog) {
            this.props.dispatchGetBlog(this.props.match.params.id)
        }
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
                        this.props.blog._creatorUser === this.props.username ?
                        <Link to={`edit/${this.props.blog._id}`}>
                            Edit
                        </Link>
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
        username: state.user.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchGetBlog: (id) => dispatch(startDispatchGetBlog(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);