import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'


const styles = theme => ({
    root: {
        height: '12vh',
        textAlign: 'center',
    },
    route: {
        textAlign: 'center',
        fontSize: '5rem',
        fontWeight: 'bold',
        color: '#b70101',
    },
    heading: {
        color: '#444',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    times: {
        height: '5vh',
        color: '#000',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginTop: '0vh'
    },
    dest: {
        height: '3vh',
        color: '#444',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    noDest: {
        paddingTop:'5vh',
        height: '3vh',
        color: '#444',
        fontSize: '2rem',
        fontWeight: 'bold',
        
    }
})

const ArrivalsSlide = ({ classes, routeNo, trips, heading }) => {

    return (
        <Grid container spacing={8} className={classes.root}>
            <Grid item xs={3}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <div className={classes.route}>{(routeNo === 2) ? 'OT' : routeNo}</div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.heading}>{heading}</div>
                    </Grid>
                </Grid>
            </Grid>
            {(trips.length) ? trips.map((trip, ind) => {
                return (
                    <Grid item xs={3} key={`bus-time-${ind}`}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <div className={classes.times}>
                                    {trip.time}
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.dest}>
                                    {trip.dest}
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }) :
                <Grid item xs={9}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}> <div className={classes.noDest}> No times scheduled </div></Grid>        
                    </Grid>
                </Grid>
            }
        </Grid>
    )
}

export default withStyles(styles)(ArrivalsSlide);
