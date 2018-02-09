import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'

import WeatherRow from './WeatherRow'


const styles = theme => ({
  root: {
    height: '14vh',
  },
  error: {
    fontSize: '30px',
    color: '#333',
    backgroundColor: '#efefef',
    padding: '5.55vh',
    textAlign: 'center'
  }
});

class WeatherCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, card, onRefreshClick } = this.props;
    var sliderSettings = {
      className: classes.root,
      arrows: false,
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 7000,
      vertical: true,
    }
    if (card && card.data && card.data[0] && card.data[0].status) {
      return (
        <div className={classes.root}>
          <div className={classes.error}>
                Server Error: {card.data[0].msg}
          </div>
        </div>
      )
    }
    else {
      const dataRows = (card) ? card.data.reduce((acc, curr, currIndex) => {
        if (currIndex % 2 === 1) { acc.push([card.data[currIndex - 1], curr]) }
        return acc
      }, []) : []
      return (
        <Slider {...sliderSettings}>
          {
            dataRows.map((dataRow, indD) => {
              return (
                <div className={classes.item} key={`weather-dataSet-${indD}`}>
                  <WeatherRow dataRow={dataRow} />
                </div>
              )
            })
          }
        </Slider>
      )
    }
  }

}

export default withStyles(styles)(WeatherCard);
