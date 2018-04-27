import React from 'react'
import { withStyles } from 'material-ui/styles'
import { card, flexAlign } from '../../styles'


const styles = theme => ({
  card,
  tile: {
    borderRadius: '3px'
  },
  loading: {
    backgroundColor: '#eff7ff',
    color: "#87b9ed",
    fontWeight: "bold",
    maxWidth: '100%',
    maxHeight: '100%',
    ...flexAlign.centerHorVert
  },
  doneLoading: {
    backgroundColor: '#fff'
  },
});

const GridTile = ({loading, className, children, classes, style, hideCard}) => {

  const dynamicClass = loading ? classes.loading : classes.doneLoading;
  return (
    <div className={[classes.tile, hideCard ? classes.card : '', dynamicClass]} style={style}>
      {!loading ? children : <div>Refreshing</div>}
    </div>
  )
}

export default withStyles(styles)(GridTile);
