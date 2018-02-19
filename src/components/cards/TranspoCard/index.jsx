import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import ArrivalSlide from './ArrivalSlide'


const styles = theme => ({
  root: {
    // height: '14vh',,
  },
  item: {
    paddingTop: '21px'
    
  },
})

class TranspoCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes, card } = this.props
    var sliderSettings = {
      className: classes.root,
      arrows: false,
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      vertical: true,
    }
    const cardData = (card) ? card.data : []
    return (
      <Slider {...sliderSettings}>
        {
          cardData.map((bus, ind) => {
            return(
              <div className={classes.item} key={`bus-${ind}`}>
                <ArrivalSlide {...bus} />
              </div>
            )
          })
        }
      </Slider>
    );
  }
}

export default withStyles(styles)(TranspoCard);
