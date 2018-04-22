import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import { card, flexAlign } from '../../../styles'

const styles = theme => ({
  root: {
    display:'flex',
    height: '39vh',
    maxWidth: '32vw',
    flexDirection: 'column'
  },
  label: {
    flex: '1 5%',
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3b5998',
    paddingTop: '0.5vh'
  },
  slider: {
    flex: '1 95%',
  },
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    margin: '1vh',
    marginTop: '0',
    padding: '1vh',
    height: '32vh',
    ...card
  },
  story: {
    textAlign: 'left',
    flex: '1 5%',
    fontSize: '1em',
    color: '#333'
  },
  time: {
    textAlign: 'left',
    flex: '1 5%',
    fontSize: '1.2em',
    color: '#333'
  },
  name: {
    flex: '1 10%',
    textAlign: 'left',
    fontSize: '2em',
    padding: '10px 0px'
  },
  postBody: {
    flex: '1 75%',
    display: 'flex',
    flexDirection: 'row',
    ...flexAlign.centerHorVert
  },
  postBodyBig: {
    flex: '1 90%'
  },
  message: {
    textAlign: 'center',
    paddingLeft: '2vh',
    flex: '1 60%',
    fontSize: '1.2em',
  },
  messageBig: {
    flex: '1 100%',
    fontSize: '3.5rem',
  },
  imgContainer: {
    flex: '1 30%',
  },
  img: {
    height: '20vh',

  },
})
const sliderSettings = {
  arrows: false,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
}

const SocialCard = ({ classes, card }) => {
  const cardData = (card) ? card.data : []
  return (
    <div className={classes.root}>
      <div className={classes.label}>Facebook</div>
      <div className={classes.slider}>
        <Slider {...sliderSettings}>
          {cardData.map(({ story, src, message, name, time }, ind) => {
            return (
              <div key={`fb-${ind}`}>
                <div className={classes.container}>
                  <div className={classes.story}>{story || 'IEEE Carleton Posted'}</div>
                  <div className={classes.time}>{time}</div>
                  {name ? <div className={classes.name}>{name}</div> : ''}
                  <div className={(src) ?  classes.postBody : classes.postBodyBig}>
                    {(src) ?
                      <div className={classes.imgContainer}><img className={classes.img} src={src} alt={message} /></div>
                      : ''
                    }
                    {message ? <div className={(src) ? classes.message : classes.messageBig}>{(message.length > 280) ? message.substring(0, 280) + '...' : message}</div> : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default withStyles(styles)(SocialCard);
