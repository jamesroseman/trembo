import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// css
import styles from './styles.css';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className={styles.app}>
          <h1>Hello, World!</h1>
        </div>
      </MuiThemeProvider>
    );
  }
}
