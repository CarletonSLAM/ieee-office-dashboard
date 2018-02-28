import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'
import Slider from 'react-slick'


const updateRateHalfMinute = 5000
const timeFormat = 'ddd. MMM Do, hh:mm A'


const styles = theme => ({
  root: {
    fontSize: '3em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1vh'
  }
})

class InfoCard extends Component {
  constructor(props) {
    super(props)
    this.state={
      dateTime: moment().format(timeFormat),
      dateInterval: setInterval(this.refreshDate.bind(this), updateRateHalfMinute)
    }

  }
  refreshDate(){
    const dateTime = moment().format(timeFormat)
    if (this.state.dateTime !== dateTime) this.setState({ dateTime })
  }

  componentWillUnmount() {
    clearInterval(this.state.dateInterval)
    this.setState({
      dateInterval: undefined
    })
  }


  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {this.state.dateTime}
      </div>
    );
  }
}

export default withStyles(styles)(InfoCard);
