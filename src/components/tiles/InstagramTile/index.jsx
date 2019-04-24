import React from 'react'
import withStyles from 'react-jss'
import Slider from 'react-slick'
import { card, flexAlign } from '../../../styles'

const styles = {
    root: {
        height: '30vh',
        maxWidth: '32vw',
        display: 'flex',
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
        display: 'flex',
        flexDirection: 'row',
        height: '31vh',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '1vh',
        padding: '1vh',
        ...card,

        ...flexAlign.centerHorVert
    },
    imgCon: {
        flex: '1 50%',
        overflow: 'hidden',
        ...flexAlign.centerHorVert
    },
    caption: {
        flex: '1 50%',
        padding: '0vh 2vh',
        color: '#444',
        fontWeight: 'bold',
        fontSize: '1.1em',
        textAlign: 'center'
    },
    img: {
        maxHeight: '100%',
        maxWidth: '100%',
        float: 'none',
        margin: 'auto',
        borderRadius: '3px'
    }
}

const InstagramTile = ({ classes, card }) => {
    const sliderSettings = {
        arrows: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    }
    const cardData = (card) ? card.data : []
    return (
        <div className={classes.root}>
            <div className={classes.label}>Instagram</div>
            <div className={classes.slider}>
                <Slider {...sliderSettings}>
                    {cardData.map((data, ind) => {
                        const { caption, imgSrc } = data
                        return (
                            <div key={`img-${ind}`}>
                                <div className={classes.container}>
                                    <div className={classes.imgCon}>
                                        <img className={classes.img} src={imgSrc} alt={caption} />
                                    </div>
                                    <div className={classes.caption}>
                                        {(caption.length > 350) ? `${caption.substring(0, 350)}...` : caption}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default withStyles(styles)(InstagramTile)
