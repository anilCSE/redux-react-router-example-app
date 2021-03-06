import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withAppBar from '../../decorators/withAppBar';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Post from './Post';
import * as BlogActions from '../../actions/BlogActions';

@withAppBar
class Blog extends Component {
  static propTypes = {
    blogposts: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  getStyles() {
    return {
      addContent: {
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 100
      }
    };
  }

  render() {
    const { router } = this.context;
    const { blogposts, users, dispatch } = this.props;
    const actions = bindActionCreators(BlogActions, dispatch);
    const styles = this.getStyles();

    return (
        <div>
          {blogposts.map((post, i) =>
                  <Post key={i}
                        post={post}
                        user={users.filter(user => user.id === post.user)[0]}
                        actions={actions}/>
          )}
          <FloatingActionButton style={styles.addContent}
                                onTouchTap={() => {
                                  router.transitionTo('/post/new');
                                }}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
    );
  }
}

export default connect(state => ({
  blogposts: state.blogposts,
  users: state.users
}))(Blog);
