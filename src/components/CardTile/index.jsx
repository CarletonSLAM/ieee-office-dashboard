import React from 'react'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';


const CardTile = (props) => {

  return (
    <Grid item xs={props.width}>
      <Paper elevation={7} >
        {props.children}
      </Paper>
    </Grid>
  )
}

export default CardTile;
