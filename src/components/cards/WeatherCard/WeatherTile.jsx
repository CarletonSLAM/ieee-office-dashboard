
import React from 'react'
import { withStyles } from 'material-ui/styles'

import Grid from 'material-ui/Grid'


const styles = theme => ({
    root: {
        padding: '0.9vh',
        textAlign: 'center'
    },
    day: {
        fontSize: '2rem',
        fontWeight: 'bold',

    },
    icon: {
        display: 'inline-block'
    },
    condition: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        height: '60px'
    },
    metric: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
    },
    label: {
        color: '#444'
    }
});
const cardBorderStyle = '#444 2px solid'

const WeatherTile = ({ classes, date, condition, icon, high, low, wind , index}) => {

    const divStyle = (index===0) ? { borderRight: cardBorderStyle } : { borderLeft: cardBorderStyle } 
    return (
        <div style={divStyle}>
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
            </Grid>
        </div>
    )

}
export default withStyles(styles)(WeatherTile)
