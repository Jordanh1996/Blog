import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Toggle from 'material-ui/Toggle';

import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getBlogsByUsername} from '../axios/blog';
import {DispatchSetBlogs} from '../actions/myblogs';

class SideBar extends React.Component {

  state = {
    open: false,
    loading: undefined
  };

  componentDidMount() {
    if (this.props.blogs.length === 0) {
        this.setState(() => ({loading: true}))
        return getBlogsByUsername(this.props.username).then((res) => {
            this.props.dispatchSetBlogs(res.data.resblog)
            this.setState(() => ({loading: false}))
        })
    }
  }

  onBlog = (e) => {
    console.log(e.target)
  }

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  render() {
    return (
      <div>
        <div>
          <List>
            <ListItem 
              primaryText="Add Blog" 
              leftIcon={<ContentSend />} 
              containerElement={<Link to={`/addblog`} />}  
            />
            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
            {
                this.state.loading ?
                <ListItem
                primaryText="Loading..."
                leftIcon={<ContentInbox />}
                initiallyOpen={true}
                primaryTogglesNestedList={true} />
                
                :

                <ListItem
                  primaryText={"My Blogs"}
                  leftIcon={<ContentInbox />}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={
                    this.props.blogs.map((blog) => {
                      return <ListItem 
                        key={blog._id}
                        primaryText={blog.title}
                        containerElement={<Link to={`/blog/${blog._id}`} />}
                        hoverColor={'#90CAF9'}
                        />
                    })
                }
            />
            }
            
          </List>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        blogs: state.myblogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSetBlogs: (blogs) => dispatch(DispatchSetBlogs(blogs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);