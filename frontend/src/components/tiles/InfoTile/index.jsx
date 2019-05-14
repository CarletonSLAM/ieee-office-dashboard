import React, { Component } from 'react'
import withStyles from 'react-jss'
import moment from 'moment'


const updateRateHalfMinute = 5000
const timeFormat = 'ddd. MMM Do, hh:mm A'


const styles = {
    root: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1vh'
    },
    time: {
        fontSize: '3em'
    },
    nextEvent: {
        fontSize: '3em',
        paddingTop: '2vh',
        color: '#2A5A8C'
    },
    summary: {
        fontSize: '3em',
        color: '#222'
    },
    duration: {
        fontSize: '2em',
        color: '#333'
    },
    front: {
        color: '#222',
        fontSize: '3em'
    },
    logoutButton: {
        maxWidth: '150px',
        borderRadius: '5px',
        padding: '0.5vh',
        float: 'none',
        margin: 'auto',
        textAlign: 'center',
        backgroundColor: '#ddd',
        color: '#aaa',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#aaa',
            color: '#777',

        }
    }
}

class InfoTile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateTime: moment().format(timeFormat),
            dateInterval: setInterval(this.refreshDate.bind(this), updateRateHalfMinute)
        }
    }

    refreshDate() {
        const dateTime = moment().format(timeFormat)
        if (this.state.dateTime !== dateTime) this.setState({ dateTime })
    }

    componentWillUnmount() {
        clearInterval(this.state.dateInterval)
        this.setState({
            dateInterval: undefined
        })
    }

    onLogout() {
        window.localStorage.clear()
        window.location.reload()
    }


    render() {
        const { classes, card } = this.props

        const cardData = card ? card.data : {}
        return (
            <>
                <div className={classes.root}>
                    <div className={classes.time}>{this.state.dateTime}</div>
                    <div className={classes.nextEvent}>Next Event</div>
                    {cardData[0]
                        ? (
                            <div>
                                <div className={classes.summary}>{cardData[0].summary}</div>
                                <div className={classes.duration}>{cardData[0].duration}</div>
                            </div>
                        )
                        : <div className={classes.front}>Ask the Front Desk for More Info!</div>
                    }
                </div>
                <div className={classes.logoutButton} onClick={this.onLogout.bind(this)}>Logout</div>
            </>
        )
    }
}

export default withStyles(styles)(InfoTile)
