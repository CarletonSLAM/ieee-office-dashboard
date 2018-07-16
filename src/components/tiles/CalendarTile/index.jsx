import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import EventSlide from './EventSlide'


const styles = theme => ({
  root: {
    height: '170vh',
    maxWidth: '32vw',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#444',
    paddingTop: '0.5vh',
    flex: '1 5%'
  },
  slider: {
    flex: '1 95%'
  }
})

const sliderSettings = {
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
}

const CalendarTile = ({ classes, card, onRefreshClick }) => {
  const cardData = (card) ? card.data : []
  return (
    <div className={classes.root}>
      <div className={classes.title}>Upcoming Events</div>
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

export default withStyles(styles)(CalendarTile);
