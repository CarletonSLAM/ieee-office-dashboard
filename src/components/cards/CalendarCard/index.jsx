import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import EventSlide from './EventSlide'


const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    color:'#444',
    padding: '1vh 0',
    flex: '1 5%'
  },
  slider: {
    flex: '1 90%',
  }
})

class CalendarCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, card, onRefreshClick } = this.props;
    var sliderSettings = {
      arrows: false,
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
        <div className={classes.slider}>
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
      </div>
    )
  }

}

export default withStyles(styles)(CalendarCard);
