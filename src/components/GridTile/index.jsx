import React from 'react'
import { withStyles } from 'material-ui/styles'
import { card } from '../../styles'


const styles = theme => ({
  tile: {
    borderRadius: '3px',
    ...card
  }
});

const GridTile = (props) => {

  const styles = Object.assign(props.loading ? {backgroundColor: '#eff7ff'} : { backgroundColor: '#fff'}, props.style);
  return (
    <div className={props.className + ' ' + props.classes.tile} style={styles}>
      {!props.loading ? props.children : ''}
    </div>
  )
}

export default withStyles(styles)(GridTile);
