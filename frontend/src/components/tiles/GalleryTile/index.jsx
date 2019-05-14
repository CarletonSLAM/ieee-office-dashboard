import React from 'react'
import withStyles from 'react-jss'
import Slider from 'react-slick'
import { flexAlign, card } from '../../../styles'


const styles = {
    root: {
        maxWidth: '31vw'

    },
    container: {
        height: '48vh',
        ...flexAlign.centerHorVert

    },
    item: {
        ...flexAlign.centerHorVert,
        backgroundColor: '#222',
        margin: '1vh',
        width: '95%',
        height: '95%',
        flexDirection: 'column',
        boxShadow: card.boxShadow
    },
    imgContainer: {
        flex: '1 90%',
        ...flexAlign.centerHorVert
    },
    caption: {
        flex: '1 10%',
        color: '#fff',
        fontSize: '2.5em',
        fontWeight: 'bold'
    },
    img: {
        maxWidth: '95%',
        maxHeight: '90%'
    }
}

const GalleryTile = ({ classes, card, onRefreshClick }) => {
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
            <Slider {...sliderSettings}>
                {
                    (cardData).map(({ src, name }, ind) => (
                        <div key={`event-${ind}`}>
                            <div className={classes.container}>
                                <div className={classes.item}>
                                    <div className={classes.imgContainer}>
                                        <img className={classes.img} src={src} alt={src} />
                                    </div>
                                    <div className={classes.caption}>
                                        {name || 'IEEE Carleton Event'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default withStyles(styles)(GalleryTile)
