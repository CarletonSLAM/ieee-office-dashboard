import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import EventSlide from './EventSlide'


const styles = theme => ({
  root: {
    height: '170vh',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#444',
    paddingTop: '1vh',
    flex: '1 10%'
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

const CalendarCard = ({ classes, card, onRefreshClick }) => {
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

export default withStyles(styles)(CalendarCard);
