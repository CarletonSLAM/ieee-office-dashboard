import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import { card, flexAlign } from '../../../styles'

const styles = theme => ({
  root: {
  },
  label: {
    fontSize: '3em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingBottom: '1vh'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '30vh',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '0vh 2vh',
    ...card
  },
  imgCon: {
    flex: '1 50%',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  caption: {
    flex: '1 50%',    
    padding: '0vh 2vh',
    color: '#444',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  img: {
    height: '30vh',
    float: 'none',
    margin: 'auto',
    borderRadius: '3px',
  },
});

const InstagramCard = ({ classes, card }) => {
  let cardData = [];
  var sliderSettings = {
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100000,
  }
  cardData = card.data || [];
  return (
    <div className={classes.root}>
      <div className={classes.label}>Instagram</div>
      <Slider {...sliderSettings}>
        {cardData.map(( data, ind) => {
            const {caption,imgSrc} = data;
            return (
              <div key={`img-${ind}`}>
                <div className={classes.container}>
                  <div className={classes.imgCon}>
                    <img className={classes.img} src={imgSrc} alt={caption} />
                  </div>
                  <div className={classes.caption}>
                    {(caption.length > 350) ? caption.substring(0, 350) + '...' : caption}
                  </div>
                </div>
              </div>
            )
        })}
      </Slider>
    </div>
  )
}

export default withStyles(styles)(InstagramCard);
