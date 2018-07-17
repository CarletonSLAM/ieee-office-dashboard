import React from 'react'
import { withStyles } from 'material-ui/styles'


const styles = theme => ({
  error: {
    fontSize: '30px',
    color: '#7f0000',
    backgroundColor: '#ffeaea',
    padding: '3vh',
    margin: '2vh',
    textAlign: 'center',
    borderRadius: '5px',
    
  },
  type: {
    fontSize: '25px',
  },
  details: {
    paddingTop: '1vh',
    fontSize: '18px',
  }
});


const EmptyTile = ({ classes, provider, type, error }) => {
    return (
        <div className={classes.error}>
            <div>Unable to get information from {provider}</div>
            <div className={classes.type}>Error Type: {type}</div>
            <div className={classes.details}>Details: {error}</div>
        </div>
    )
}

export default withStyles(styles)(EmptyTile);
