import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'


const styles = theme => ({
    root: {
        textAlign: 'left',
        padding: '0vh 2vh',
        overflow: 'hidden',
        height: '75vh',
        display: 'flex',
        flexDirection: 'column'
    },
    summary: {
        flex: '1 15%',
        fontSize: '2.8rem',
        fontWeight: 'bold',
        color: '#2A5A8C',
    },
    duration: {
        flex: '1 15%',
        fontSize: '2.2rem',
        fontWeight: 'bold',
        color: '#3d3d3d',
    },
    location: {
        flex: '1 15%',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#161616',
    },
    description: {
        flex: '1 55%',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#111',
    },
    label: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#555',

    }
})

const EventSlide = ({ classes, summary, duration, location, description }) => {
    description = (description.length > 800) ? description.slice(0, 800) + '...' : description;
    return (
        <div className={classes.root}>
            <div className={classes.summary}>
                {summary}
            </div>   
            <div className={classes.duration}>
            <div className={classes.label}>Duration</div>
                {duration}
            </div>
            <div className={classes.location}>
            <div className={classes.label}> Location</div>
                {location}
            </div>      
            <div className={classes.description}>
                <div className={classes.label}> Description</div>
                {description || 'No Description Provided'}
            </div>
        </div>
    )
}

export default withStyles(styles)(EventSlide);
