import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'

const styles = theme => ({
  root: {
    height: '75vh',
    padding: '1vh',
    // backgroundColor: '#000',
    overflow: 'hidden'
  },
  imgCon: {
    overflow: 'hidden',
    width: '40h',
    backgroundColor: '#000',
  },
  img: {
    height: '40vh',
    float: 'none',
    margin: 'auto',
    borderRadius: '3px',
  },
  caption: {
    padding: '2vh',
    color: '#444',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
  }
});

const InstagramCard = ({ classes, card }) => {
  var sliderSettings = {
    className: classes.root,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  }
  const cardData = card.data || [];
  return (
    <div className={classes.root}>
      <Slider {...sliderSettings}>
        {cardData.map(({ caption, imgSrc, date }, ind) => {
          return (
            <div key={`img-${ind}`}>
              <div className={classes.imgCon} >
                <img className={classes.img} src={imgSrc} alt={caption} />
              </div>
              <div className={classes.caption}>
                {(caption.length > 350) ? caption.substring(0, 350) + '...' : caption}
              </div>
            </div>
            )
        })}
      </Slider>
    </div>
  )
}

export default withStyles(styles)(InstagramCard);
