import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class BlogForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
    }

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    onContentChange = (e) => {
        const content = e.target.value;
        this.setState(() => ({content}))
    }

    onSubmit = () => {
        this.props.onSubmit(this.props.token, this.state.title, this.state.content)
    }


    render () {
        return (
            <div>
                    <p>title :</p>
                    <textarea 
                    autoFocus
                    value={this.state.title}
                    onChange={this.onTitleChange}
                    />

                    <p>content: </p>
                    <textarea 
                    value={this.state.content}
                    onChange={this.onContentChange}
                    />

                    <button onClick={this.onSubmit}>
                        submit
                    </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(BlogForm);