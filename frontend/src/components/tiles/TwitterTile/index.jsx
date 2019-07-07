import React from 'react'
import withStyles from 'react-jss'
import Slider from 'react-slick'
import { Twemoji } from 'react-emoji-render'
import { card } from '../../../styles'

const styles = {
    root: {
        display: 'flex',
        height: '39vh',
        maxWidth: '32vw',
        flexDirection: 'column'
    },
    label: {
        flex: '1 5%',
        fontSize: '2em',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        paddingTop: '0.5vh'
    },
    slider: {
        flex: '1 95%'
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
    time: {
        textAlign: 'left',
        flex: '1 5%',
        fontSize: '1.2em',
        color: '#333'
    },
    postBody: {
        flex: '1 90%'
    },
    message: {
        flex: '1 100%',
        fontSize: '2em',
        overflow: '-webkit-paged-y',
        '& img': {
          display: 'inline'
        }
    }
}

const sliderSettings = {
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000
}

const TwitterTile = ({ classes, card }) => {
    const cardData = (card) ? card.data : []
    return (
        <div className={classes.root}>
            <div className={classes.label}>Twitter @ieeecu</div>
            <div className={classes.slider}>
                <Slider {...sliderSettings}>
                    {cardData.map(({
                        message, time
                    }, ind) => (
                        <div key={`fb-${ind}`}>
                            <div className={classes.container}>
                                <div className={classes.time}>{time}</div>
                                <div className={classes.postBody}>
                                    {message ? <div className={classes.message}><Twemoji text={(message.length > 280) ? `${message.substring(0, 280)}...` : message}/></div> : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default withStyles(styles)(TwitterTile)
