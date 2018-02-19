import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardTile from '../CardTile'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import services from '../../services'

import {
  CalendarCard,
  InfoCard,
  InstagramCard,
  AnnoucementCard,
  TranspoCard,
  WeatherCard
} from '../cards'

import { connect } from 'react-redux'

import {
  getDataIfNeeded,
  setDataStale
} from '../../actions'


const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  topSection: {
    flexGrow: '25',
    flexShrink: '25',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  topItems: {
    flex: '1 33%',
    margin: '1vh',
    width: '0'
  },
  topMiddleSection: {
    flex: '1 33%',
    display: 'flex',
    flexDirection: 'column',
    width: '0'
  },
  topMiddleItems: {
    flex: '1 50%',
    margin: '1vh',
    // width: '0'
  },
  bottomSection: {
    flexGrow: '1',
    flexShrink: '1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  bottomItems: {
    flex: '1 50%',
    margin: '1vh',
    width: '0'
  }
});

class CardGrid extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getDataIfNeeded('weather'))
    dispatch(getDataIfNeeded('transpo'))
    dispatch(getDataIfNeeded('calendar'))
    dispatch(getDataIfNeeded('instagram'))
  }

  handleRefreshClick(card) {
    const { dispatch } = this.props
    dispatch(setDataStale(card))
    dispatch(getDataIfNeeded(card))
  }
  render() {
    const { classes, annoucements, instagram, gallery, calendar, transpo, weather, onRefreshClick } = this.props;
    return (
      <div className={classes.root} >
        <div className={classes.topSection}>
            <CardTile className={classes.topItems}>
                <AnnoucementCard card={annoucements || {}} />
            </CardTile>
            <div className={classes.topMiddleSection}>
              <CardTile className={classes.topMiddleItems}>
                  <InfoCard card={instagram || {}} />
              </CardTile>
              <CardTile className={classes.topMiddleItems}>
                  <InstagramCard card={instagram || {}} />
              </CardTile>
            </div>
            <CardTile className={classes.topItems}>
                <CalendarCard card={calendar} />
            </CardTile>
        </div>
        <div className={classes.bottomSection}>
            <CardTile className={classes.bottomItems}>
                <TranspoCard card={transpo} />
            </CardTile>
            <CardTile className={classes.bottomItems}>
                <WeatherCard card={weather} />
            </CardTile>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {...state.cards }
}

CardGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(mapStateToProps)(withStyles(styles)(CardGrid));
