import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'

const styles = theme => ({
  root: {
    height: '20vh'
  },
  label: {
    fontSize: '3em',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3b5998',
    paddingBottom: '1vh'
  },
  container: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    padding: '0vh 2vh',
  },
  story: {
    textAlign: 'left',
    flex: '1 10%',
    fontSize: '1.2em',
    color: '#333'

  },
  name: {
    flex: '1 10%',
    textAlign: 'left',
    fontSize: '2.5em',
    padding: '10px 0px'
  },
  postBody: {
    flex: '1 80%',
    display: 'flex',
    flexDirection: 'row'
  },
  message: {
    flex: '1 60%',
    fontSize: '1.5rem',
  },
  messageBig: {
    flex: '1 60%',
    fontSize: '2.5rem',
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
  autoplaySpeed: 100000,
}

const SocialCard = ({classes, card}) => {
  const cardData = card.data || [];
  return (
    <div className={classes.root}>
    <div className={classes.label}>Facebook</div>
      <Slider {...sliderSettings}>
      {cardData.map(({story, src, message, name} , ind) => {
       return (
          <div key={`fb-${ind}`}>
            <div className={classes.container}>
              <div className={classes.story}>{story || 'IEEE Carleton Posted'}</div>
              <div className={classes.name}>{name}</div>
              <div className={classes.postBody}>
                { (src) ? 
                    <div className={classes.imgContainer}><img className={classes.img} src={src} alt={message} /></div>
                  : '' 
                }
                { message.length ? <div className={ (src) ? classes.message : classes.messageBig}>{(message.length > 280) ? message.substring(0, 280) + '...' : message}</div> : '' }
              </div>
            </div>
        </div>
       );
      })}
      </Slider>
    </div>
  );
}

export default withStyles(styles)(SocialCard);
