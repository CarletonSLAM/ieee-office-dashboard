
import React from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { card, flexAlign } from '../../../styles'


const styles = theme => ({
    root: {
        flex: '1 50%',
        padding: '1vh',
        margin: '1vh',
        textAlign: 'center',
        height: '9.5vh',
        ...card
    },
    topSection: {
        flex: '1 40%',
        flexDirection: 'row',
        ...flexAlign.centerHorVert
    },
    bottomSection: {
        flex: '1 60%',
        flexDirection: 'row',
        ...flexAlign.centerHorVert
    },
    day: {
        flex: '1 33%',
        fontSize: '2rem',
        fontWeight: 'bold',

    },
    iconContainer: {
        flex: '1 33%',
    },
    icon: {
        maxHeight: '100%'
    },
    condition: {
        flex: '1 33%',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    metric: {
        flex: '1 33%',
        fontSize: '1.8rem',
        fontWeight: 'bold',
    },
    label: {
        color: '#444'
    }
});

const WeatherTile = ({ classes, date, condition, icon, high, low, wind, index }) => {

    return (
        <div className={classes.root}>
            <div className={classes.topSection}>
                <div className={classes.day}>{date}</div>
                <div className={classes.icon}>
                    <img className={classes.iconContainer} src={icon} alt={condition} />
                </div>
                <div className={classes.condition}>{condition}</div>
            </div>
            <div className={classes.bottomSection}>
                <div item xs={4} className={classes.metric}>
                    <div>{high} ℃</div>
                    <div className={classes.label}>HIGH</div>

                </div>
                <div item xs={4} className={classes.metric}>
                    <div>{low} ℃</div>
                    <div className={classes.label}>LOW</div>

                </div>
                <div item xs={4} className={classes.metric}>
                    <div>{wind} kph</div>
                    <div className={classes.label}>WIND</div>
                </div>
            </div>

{/* 
            <Grid className={classes.root} container spacing={8}>
                <Grid item xs={12}>
                    <Grid container spacing={16} style={{ justifyContent: 'space-around' }}>
                        <Grid item xs={4}>
                            <div className={classes.day}>{date}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.icon}>
                                <img className={classes.icon} src={icon} alt={condition} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.condition}>{condition}</div>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12}>

                    <Grid container spacing={24}>
                        <Grid item xs={4} className={classes.metric}>
                            <div>{high} ℃</div>
                            <div className={classes.label}>HIGH</div>

                        </Grid>
                        <Grid item xs={4} className={classes.metric}>
                            <div>{low} ℃</div>
                            <div className={classes.label}>LOW</div>

                        </Grid>
                        <Grid item xs={4} className={classes.metric}>
                            <div>{wind} kph</div>
                            <div className={classes.label}>WIND</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
        </div>
    )

}
export default withStyles(styles)(WeatherTile)
