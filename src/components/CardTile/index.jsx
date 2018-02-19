import React from 'react'
import { withStyles } from 'material-ui/styles'


const styles = theme => ({
  tile: {
    boxShadow: '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
    borderRadius: '3px',
    backgroundColor: '#fff'
  }
});

const CardTile = (props) => {
  return (
    <div className={props.className + ' ' + props.classes.tile}>
      {props.children}
    </div>
  )
}

export default withStyles(styles)(CardTile);
