import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Dialog } from 'material-ui';

class MessageForm extends React.Component {

    state = {
        open: false,
        message: '',
        edit: null
    };

    onMessageChange = (e) => {
        const message = e.target.value;
        this.setState(() => ({ message }));
    }

    openAddModal = () => {
        this.setState(() => ({
            open: true,
            message: '',
            edit: false
        }));
    }

    openEditModal = (content, id) => {
        this.setState(() => ({
            open: true,
            message: content,
            edit: id
        }));
    }

    closeModal = () => {
        this.setState(() => ({ open: false }));
    }

    onSubmit = () => {
        this.props.onMessageSubmit(this.state.message, this.state.edit);
        this.closeModal();
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary
                onClick={this.closeModal}
            />,
            <FlatButton
                label="Submit"
                primary
                onClick={this.onSubmit}
            />,
        ];
        return (
            <div>
                <RaisedButton
                    primary
                    label='Add Message'
                    onClick={this.openAddModal}
                    className='blog__button'
                />
                <Dialog
                    title={this.state.edit ? 'Edit Message' : 'Add Message'}
                    modal={false}
                    actions={actions}
                    open={this.state.open}
                    onRequestClose={this.props.closeModal}
                >
                    <TextField
                        hintText="Content"
                        value={this.state.message}
                        onChange={this.onMessageChange}
                        multiLine
                        rows={8}
                        style={{
                            width: '100%'
                        }}
                    />

                </Dialog>
            </div>
        );
    }
}

export default MessageForm;
