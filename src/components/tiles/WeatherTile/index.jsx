import React from 'react'
import withStyles from 'react-jss'
import Slider from 'react-slick'


import WeatherCard from './WeatherCard'


const styles = {
  error: {
    fontSize: '30px',
    color: '#333',
    backgroundColor: '#efefef',
    padding: '5.55vh',
    textAlign: 'center'
  },
  rowFlex: {
    display: 'flex',
    flexDirection: 'row'
  }
}

const sliderSettings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 7000,
  vertical: true,
}

const WeatherTile = ({ classes, card, onRefreshClick }) => {

  if (card && card.data && card.data[0] && card.data[0].status) {
    return (
      <div className={classes.error}>
        Server Error: {card.data[0].msg}
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
              <div key={`weather-dataSet-${indD}`}>
                <div className={classes.rowFlex} >
                  {dataRow.map((data, ind) => {
                    return (
                      <WeatherCard {...data} key={`weather-dataSet-${(indD*2) + ind}`} />
                    )
                  })}
                </div>
              </div>
            )
          })
        }
      </Slider>
    )
  }
}

export default withStyles(styles)(WeatherTile);
