import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import ArrivalSlide from './ArrivalSlide'


const styles = theme => ({
  root: {
    height: '13vh'
  }
})

const sliderSettings = {
  arrows: false,
  dots: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  vertical: true,
}

const TranspoTile = ({ classes, card }) => {
  const cardData = (card) ? card.data : []
  return (
    <div className={classes.root}>
      <Slider {...sliderSettings}>
        {
          cardData.map((bus, ind) => {
            return (
              <div key={`bus-${ind}`}>
                <ArrivalSlide {...bus} />
              </div>
            )
          })
        }
      </Slider>
    </div>
  );
}

export default withStyles(styles)(TranspoTile);
