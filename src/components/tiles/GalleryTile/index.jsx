import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import { flexAlign, card } from '../../../styles'


const styles = theme => ({
  root: {

  },
  item: {
    height: '619px',
    ...flexAlign.centerHorVert
  },
  imgContainer: {
    height: '90%',
    width: '100%',
    margin: '24px',
    backgroundColor: '#222',
    boxShadow: card.boxShadow,
    ...flexAlign.centerHorVert
  },
  img: {
    maxWidth: '90%',
    maxHeight: '90%',
  }
})

const GalleryCard = ({ classes, card, onRefreshClick }) => {
  const sliderSettings = {
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100000,
  }
  const cardData = card.data || []
  return (
    <div className={classes.root}>
      <Slider {...sliderSettings}>
        {
          (cardData).map(({ src }, ind) => {
            return (
              <div key={`event-${ind}`}>
                <div className={classes.item}>
                  <div className={classes.imgContainer}>
                    <img className={classes.img} src={src} alt={src} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </Slider>
    </div>
  )
}

export default withStyles(styles)(GalleryCard);
