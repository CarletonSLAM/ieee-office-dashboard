import React from 'react'
import { withStyles } from 'material-ui/styles'


const styles = theme => ({
  root: {
    // height: '77vh' 
  }
});

const AnnoucementCard = (props) => {
  const {classes} = props;
  return (
    <div className={classes.root}> Hessllo</div>
  )
}

export default withStyles(styles)(AnnoucementCard);
