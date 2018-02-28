import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardTile from '../CardTile'
import { withStyles } from 'material-ui/styles'

import {
  CalendarCard,
  FacebookCard,
  InfoCard,
  InstagramCard,
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
    flex: '1 84%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  },

  topMiddleSection: {
    flex: '1 28%',
    display: 'flex',
    flexDirection: 'column',
    width: '0'
  },
  topLeftRightSection: {
    flex: '1 36%',
    margin: '1vh',
    width: '0',
    display: 'flex',
    flexDirection: 'column',
  },
  bottomSection: {
    flex: '1 16%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  bottomItems: {
    flex: '1 50%',
    margin: '1vh',
    width: '0'
  },
  topLeftItems: {
    flex: '1 50%'
  },
  topMiddleItems: {
    flex: '1 50%',
    margin: '1vh',
    // width: '0'
  },
});

class CardGrid extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  componentDidMount() {
    this.fetchDatasources()
    setInterval(this.fetchDatasources.bind(this), 100000);
  }

  fetchDatasources() {
    const { dispatch } = this.props


    console.log('staling');
    dispatch(setDataStale('weather'))
    dispatch(setDataStale('transpo'))
    dispatch(setDataStale('calendar'))
    dispatch(setDataStale('instagram'))
    dispatch(setDataStale('instagram'))
    dispatch(setDataStale('facebook'))
    console.log('fetching');

    dispatch(getDataIfNeeded('weather'))
    dispatch(getDataIfNeeded('transpo'))
    dispatch(getDataIfNeeded('calendar'))
    dispatch(getDataIfNeeded('instagram'))
    dispatch(getDataIfNeeded('instagram'))
    dispatch(getDataIfNeeded('facebook'))
  }

  handleRefreshClick(card) {
    const { dispatch } = this.props
    dispatch(setDataStale(card))
    dispatch(getDataIfNeeded(card))
  }
  render() {
    const { classes, annoucements, facebook, instagram, calendar, transpo, weather, onRefreshClick } = this.props;
    return (
      <div className={classes.root} >
        <div className={classes.topSection}>
          <div className={classes.topLeftRightSection}>
            <CardTile loading={instagram && instagram.isFetching || false} className={classes.topLeftItems} style= {{marginBottom: '1vh'}}>
              <InstagramCard card={instagram || {}} />
            </CardTile>
            <CardTile loading={facebook && facebook.isFetching || false} className={classes.topLeftItems} style= {{marginTop: '1vh'}}>
              <FacebookCard card={facebook || {}} />
            </CardTile>
          </div>
          <div className={classes.topMiddleSection}>
            <CardTile className={classes.topMiddleItems}>
              <InfoCard />
            </CardTile>
            <CardTile loading={instagram && instagram.isFetching || facebook && facebook.isFetching || false} className={classes.topMiddleItems}>
              {/* <InstagramCard cards={[instagram, facebook] || []} /> */}
            </CardTile>
          </div>
          <CardTile loading={calendar && calendar.isFetching || false} className={classes.topLeftRightSection}>
            <CalendarCard card={calendar} />
          </CardTile>
        </div>
        <div className={classes.bottomSection}>
          <CardTile loading={transpo && transpo.isFetching || false} className={classes.bottomItems}>
            <TranspoCard card={transpo} />
          </CardTile>
          <CardTile loading={weather && weather.isFetching || false} className={classes.bottomItems}>
            <WeatherCard card={weather} />
          </CardTile>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.cards }
}

CardGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(mapStateToProps)(withStyles(styles)(CardGrid));
