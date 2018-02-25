import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class BlogForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.blog ? props.blog.title : '',
            content: props.blog ? props.blog.content : '',
            disable: false
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
        this.setState(() => ({disable: true}))
        this.props.onSubmit(this.props.token, this.state.title, this.state.content)
    }


    render () {
        return (
            <Card
                style={{
                    'margin': '1rem'
                }}
            >
                <CardText
                style={{
                    'display': 'flex',
                    'flexDirection': 'column'
                }}
                >
                    <TextField
                        hintText="Title"
                        floatingLabelText="Title"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        style={{
                            'width': '100%'
                        }}
                    />
                    <TextField
                        hintText="Content"
                        floatingLabelText="Content"
                        value={this.state.content}
                        onChange={this.onContentChange}
                        multiLine={true}
                        rows={12}
                        style={{
                            'width': '100%'
                        }}
                    />

                    <RaisedButton 
                        onClick={this.onSubmit} disabled={this.state.disable} 
                        label='Submit'
                        primary={true}
                    />
                </CardText>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}

export default connect(mapStateToProps)(BlogForm);