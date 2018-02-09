import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles'
import CardGrid from './components/CardGrid'

const styles = theme => ({
  body: {
    backgroundColor:'#0c2e51',
    // backgroundColor:'#444',
    padding: '24px',
    height: '100vh',
    overflow: 'none'
  }
});


class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div  className={this.props.classes.body}>
        <CardGrid />
      </div>
    );
  }
}

export default (withStyles(styles)(App));
