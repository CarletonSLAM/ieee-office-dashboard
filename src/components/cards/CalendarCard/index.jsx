import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import EventSlide from './EventSlide'


const styles = theme => ({
  root: {
    height: '77vh'
  },
  slider: {
    height: '71vh'    
  },
  title: {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    color:'#444',
    padding: '1vh 0'
  }
})

class CalendarCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, card, onRefreshClick } = this.props;
    var sliderSettings = {
      className: classes.slider,
      arrows: false,
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    }
    const cardData = (card) ? card.data : []
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          Upcoming Events
        </div>
        <Slider {...sliderSettings}>
          {
            cardData.map((event, ind) => {
              return (
                <div className={classes.item} key={`event-${ind}`}>
                  <EventSlide {...event} />
                </div>
              )
            })
          }
        </Slider>
      </div>
    )
  }

}

export default withStyles(styles)(CalendarCard);
