import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'


const styles = theme => ({
    root: {
        textAlign: 'left',
        padding: '2vh',
        height: '69vh',
        overflow: 'hidden'
    },
    summary: {
        fontSize: '2.8rem',
        fontWeight: 'bold',
        color: '#2A5A8C',
    },
    duration: {
        fontSize: '2.2rem',
        fontWeight: 'bold',
        color: '#3d3d3d',
    },
    location: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#161616',
    },
    description: {
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

    return (
        <Grid container spacing={16} className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.label}> Summary</div>
                <div className={classes.summary}>{summary}</div>                
            </Grid>
            <Grid item xs={12}>
                <div className={classes.label}> Date and Time</div>
                <div className={classes.duration}>{duration}</div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.label}> Location</div>
                <div className={classes.location}>{location}</div>                
            </Grid>
            <Grid item xs={12}>
                <div className={classes.label}> Description</div>
                <div className={classes.description}>{description || 'No Description Provided'}</div>
            </Grid>

        </Grid>
    )
}

export default withStyles(styles)(EventSlide);
