import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function withAppBar(ComposedComponent) {
  class AppBar extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
      ])
    }

    getStyles() {
      return {
        main: {
          maxWidth: 950,
          margin: '0 auto',
          paddingTop: 10
        }
      };
    }

    render() {
      const { context, ...other } = this.props;
      const styles = this.getStyles();

      return (
          <div>
            <Header />
            <main style={styles.main}>
              <ComposedComponent {...other} />
              <Footer />
            </main>
          </div>
      );
    }
  }

  return connect()(AppBar);
}




