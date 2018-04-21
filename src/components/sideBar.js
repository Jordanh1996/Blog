import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startDispatchSetBlogs } from '../actions/myblogs';

class SideBar extends React.Component {

  state = {
    open: false,
    loading: null
  };

  componentDidMount() {
    if (this.props.blogs.length > 0) {
      return;
    }
    if (this.props.isLogged) {
      this.setState(() => ({ loading: true }));
      this.props.setBlogs().then(() => {
        this.setState(() => ({ loading: false }));
      });
    }
  }

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    return (
      <List
        style={{
          background: 'white',
          overflowY: 'scroll',
          overflowX: 'hidden',
          width: '20rem'
        }}
        className="sidebar"
      >
        <ListItem 
          primaryText="Add Blog" 
          leftIcon={<ContentSend color={'#3F51B5'} />} 
          containerElement={<Link to={'/addblog'} />}  
        />
        {
          this.props.isLogged ?
          null :
          <ListItem
            primaryText="Sign In"
            leftIcon={<ActionGrade color={'#3F51B5'} />}
            containerElement={<Link to={'sign'} />}
          />
        }
        {
            this.state.loading ?
            <ListItem
              primaryText="My Blogs"
              leftIcon={<ContentInbox color={'#3F51B5'} />}
              initiallyOpen
              primaryTogglesNestedList
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Loading..."
                />
              ]}
            />
            :

            <ListItem
              primaryText={'My Blogs'}
              leftIcon={<ContentInbox color={'#3F51B5'} />}
              initiallyOpen
              primaryTogglesNestedList
              
              nestedItems={
                this.props.blogs.map((blog) => {
                  return <ListItem 
                    key={blog._id}
                    primaryText={blog.title}
                    containerElement={<Link to={`/blog/${blog._id}`} />}
                    hoverColor={'#90CAF9'}
                    style={{
                      'workBreak': 'break-all'
                    }}
                    />
                })
            }
        />
        }
        
      </List>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.myblogs,
        isLogged: state.user.username
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setBlogs: () => dispatch(startDispatchSetBlogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
