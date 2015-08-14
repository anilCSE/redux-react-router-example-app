import React, { Component, PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux';
import * as hooks from './hooks';
import withMaterialUI from './decorators/withMaterialUI';

/* develblock:start */
import withDevTools from './decorators/withDevTools';
/* develblock:end */

import Blog from './views/Blog';
import Draft from './views/Draft';
import Login from './views/Login';

hooks.bootstrap(store)();


@withMaterialUI
/* develblock:start */
@withDevTools(store)
/* develblock:end */
class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;

    return (
        <Provider store={store}>
          {() =>
              <Router history={history}>
                <Route path='/' component={Blog}/>
                <Route path='/post/:id/edit' name='editPost' component={Draft}
                       onEnter={hooks.editPost(store)}/>
                <Route path='/post/new' component={Draft}/>
                <Route path='/login' component={Login}/>
              </Router>
          }
        </Provider>
    );
  }
}

export default Root;
