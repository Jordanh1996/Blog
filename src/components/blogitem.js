import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';



class BlogItem extends React.Component {


    render() {
        return (
            <Card
                style={{
                    margin: '1rem'
                }}>
            <CardHeader
              title={this.props.title}
              titleStyle={{
                'fontSize': '3.6rem',
                'wordBreak': 'break-all'
              }}
              subtitle={`Posted by ${this.props.creator}, ` + 
                (moment().unix() * 1000 - this.props.createdAt > 2246400000 ?
                    `${moment(this.props.createdAt).format('MMMM Do YYYY')}` :
                    `${moment(this.props.createdAt).fromNow()}`)
            }
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardActions>
                <Link to={`/blog/${this.props.id}`}>
            <RaisedButton label="View in Page" primary={true} />
            </Link>
            </CardActions>
            <CardText expandable={true}>
              {this.props.content}
            </CardText>
          </Card>
        )
    }
}

export default BlogItem;