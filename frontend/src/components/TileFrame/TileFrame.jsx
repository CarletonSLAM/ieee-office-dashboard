import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { card, flexAlign } from '../../styles'


const styles = {
    tile: {
        borderRadius: '3px',
        ...card
    },
    loading: {
        backgroundColor: '#eff7ff',
        color: '#87b9ed',
        fontWeight: 'bold',
        maxWidth: '100%',
        maxHeight: '100%',
        ...flexAlign.centerHorVert
    },
    doneLoading: {
        backgroundColor: '#fff'
    }
}

const TileFrame = ({
    loading, children, classes, style
}) => {
    const dynamicClass = loading ? classes.loading : classes.doneLoading
    return (
        <div className={`${classes.tile} ${dynamicClass}`} style={style}>
            {!loading ? children : <div>Refreshing</div>}
        </div>
    )
}

TileFrame.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    style: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}


export default withStyles(styles)(TileFrame)
