import React from 'react'
import withStyles from 'react-jss'
import { card } from '../../../styles'

const wordLimit = 700
const styles = {
    root: {
        textAlign: 'left',
        margin: '1vh',
        padding: '2vh',
        overflow: 'hidden',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        ...card
    },
    summary: {
        flex: '1 13%',
        fontSize: '2.5em',
        fontWeight: 'bold',
        color: '#2A5A8C'
    },
    duration: {
        flex: '1 13%',
        fontSize: '1.8em',
        fontWeight: 'bold',
        color: '#3d3d3d'
    },
    location: {
        flex: '1 13%',
        fontSize: '1.8em',
        fontWeight: 'bold',
        color: '#161616'
    },
    description: {
        flex: '1 61%',
        fontSize: '1.25em',
        fontWeight: 'bold',
        lineHeight: '150%',
        color: '#111',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap'
    },
    label: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#555'

    }
}

const EventSlide = ({
    classes, summary, duration, location, description
}) => {
    const tempDesc = document.createElement('div')
    tempDesc.innerHTML = description
    description = tempDesc.innerText.trim()
    description = (description.length > wordLimit) ? `${description.slice(0, wordLimit)}...` : description
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
                <p style={{ margin: 0 }}>
                    {description || 'No Description Provided'}
              </p>
          </div>
      </div>
    )
}

export default withStyles(styles)(EventSlide)
