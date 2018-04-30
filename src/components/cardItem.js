import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';


class CardItem extends React.Component {

    onEdit = () => {
        this.props.onEdit(this.props.item.content, this.props.item.id);
    }

    onRemove = () => {
        this.props.confirmRemove(this.props.item.id, this.props.item.image);
    }

    render() {
        return (
            <Card
                className='cardItem'
            >
                <CardHeader
                    title={this.props.item.title}
                    titleStyle={{
                        fontSize: '3.6rem',
                        wordBreak: 'break-all'
                    }}
                    subtitle={`Posted by ${this.props.item.creatorUsername}, ${
                        moment().unix() * 1000 - this.props.item.createdAt > 2246400000 ?
                            `${moment(this.props.item.createdAt).format('MMMM Do YYYY')}` :
                            `${moment(this.props.item.createdAt).fromNow()}`}`
                    }
                />

                <CardText
                    style={{
                        wordBreak: 'break-all'
                    }}
                >
                    <p className="blog__content">{this.props.item.content}</p>
                    {
                        this.props.item.image ?
                            <img
                                src={
                                    `https://s3-eu-west-1.amazonaws.com/blog-jordan/${this.props.item.image}`
                                }
                                className="blog__image"
                            /> :
                            null
                    }
                    {
                        this.props.item.edited ?
                            <p className='blog__edited'>Last Edited : {(moment().unix() * 1000 - this.props.item.updatedAt > 2246400000 ?
                                `${moment(this.props.item.updatedAt).format('MMMM Do YYYY')}` :
                                `${moment(this.props.item.updatedAt).fromNow()}`)}</p> :
                            ''
                    }
                </CardText>

                <CardActions>
                    {
                        this.props.item.creatorUsername === this.props.user ?
                            <div>
                                <RaisedButton
                                    label="Edit"
                                    primary
                                    containerElement={this.props.link ? <Link
                                        to={`edit/${this.props.item.id}`}
                                    /> : <div />}
                                    onClick={this.onEdit}
                                    className='cardItem-button'
                                />

                                <RaisedButton
                                    label="Remove"
                                    secondary
                                    onClick={this.onRemove}
                                    style={{
                                        marginLeft: '1rem'
                                    }}
                                    className='cardItem-button'
                                />
                            </div>
                            : ''
                    }
                </CardActions>
            </Card>
        );
    }
}

export default CardItem;
