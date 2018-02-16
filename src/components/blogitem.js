import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const BlogItem = (props) => (
    <Link to={`/blog/${props.id}`}>
        {props.title} : {props.content}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
    </Link>
)

const mapStateToProps = (state) => {
    return {
        blogs: state
    }
}

export default connect(mapStateToProps)(BlogItem)