
import React from 'react'
import { withStyles } from 'material-ui/styles'
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

const WeatherCard = ({ classes, date, condition, icon, high, low, wind, key }) => {

    return (
        <div key={key} className={classes.root}>
            <div className={classes.topSection}>
                <div className={classes.day}>{date}</div>
                <div className={classes.icon}>
                    <img className={classes.iconContainer} src={icon} alt={condition} />
                </div>
                <div className={classes.condition}>{condition}</div>
            </div>
            <div className={classes.bottomSection}>
                <div className={classes.metric}>
                    <div>{high} ℃</div>
                    <div className={classes.label}>HIGH</div>

                </div>
                <div className={classes.metric}>
                    <div>{low} ℃</div>
                    <div className={classes.label}>LOW</div>

                </div>
                <div className={classes.metric}>
                    <div>{wind} kph</div>
                    <div className={classes.label}>WIND</div>
                </div>
            </div>
        </div>
    )

}
export default withStyles(styles)(WeatherCard)
