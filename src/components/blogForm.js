import React from 'react';

import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class BlogForm extends React.Component {

    state = {
        title: this.props.blog ? this.props.blog.title : '',
        content: this.props.blog ? this.props.blog.content : '',
        image: this.props.blog ? this.props.blog.image : null,
        imageChanged: false,
        disable: false
    };

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    }

    onContentChange = (e) => {
        const content = e.target.value;
        this.setState(() => ({ content }));
    }

    onFileChange = (e) => {
        const oldImageKey = this.state.image;
        if (!this.state.imageChanged) {
            this.setState(() => ({ imageChanged: oldImageKey }));
        }
        const image = e.target.files[0];
        this.setState(() => ({ image }));
    }

    onSubmit = () => {
        this.setState(() => ({ disable: true }));
        this.props.onSubmit(this.state.title, this.state.content, this.state.image, this.state.imageChanged);
    }

    render() {
        return (
            <Card
                style={{
                    margin: '1rem'
                }}
            >
                <CardText
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
                >
                    <TextField
                        hintText="Title"
                        floatingLabelText="Title"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        style={{
                            width: '100%'
                        }}
                    />
                    <TextField
                        hintText="Content"
                        floatingLabelText="Content"
                        value={this.state.content}
                        onChange={this.onContentChange}
                        multiLine
                        rows={12}
                        style={{
                            width: '100%'
                        }}
                    />

                    <input
                        onChange={this.onFileChange}
                        type='file'
                        accept='image/*'
                    />

                    <RaisedButton 
                        onClick={this.onSubmit} disabled={this.state.disable} 
                        label='Submit'
                        primary
                    />
                </CardText>
            </Card>
        );
    }
}

export default BlogForm;
