import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'
import Slider from 'react-slick'
import GridTile from '../../GridTile'

import tiles from '../../tiles'

const updateRateHalfMinute = 5000
const timeFormat = 'ddd. MMM Do, hh:mm A'


const styles = theme => ({
  root: {
    height: '80vh',
    width:'90vw',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '1vh'
  },
  time: {
    fontSize: '3em',
  },
  nextEvent: {
    fontSize: '3em',
    paddingTop: '2vh',
    color: '#2A5A8C',
  },
  summary: {
    fontSize: '3em',
    color: '#222'
  },
  duration: {
    fontSize: '2em',
    color: '#333'
  },
  front: {
    color: '#222',
    fontSize: '3em'
  }
})

const sliderSettings = {
  arrows: false,
  infinite: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
}

class InfoCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const { classes, card } = this.props
    console.log(this.props)
    
    const cardData = card || [];
    return (
      <div className={classes.root}>
        <Slider {...sliderSettings}>
          {cardData.map((tileData, index)=> {
            console.log(index)
            const tileType = tileData.name[0].toUpperCase() + tileData.name.slice(1);
            const TileElement = tiles[`${tileType}Tile`]
            return (
              <GridTile key={`level-${this.layoutLevels}-${index}`} loading={tileData && tileData.data && tileData.data.isFetching}>
                <TileElement card={tileData.data}/>
              </GridTile>
            )
          })}
        </Slider>
    </div>
    );
  }
}

export default withStyles(styles)(InfoCard);
