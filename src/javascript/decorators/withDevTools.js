import React from 'react'; // eslint-disable-line no-unused-vars
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default function withDevTools(store) {
  return (ComposedComponent) => class WithDevTools {
    render() {
      const { context, ...other } = this.props;
      return (
          <div>
            <ComposedComponent {...other} />;
            <DebugPanel top right bottom>
              <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
          </div>
      );
    }
  };
}
