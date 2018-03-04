import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridTile from '../GridTile'
import { withStyles } from 'material-ui/styles'

import {
  CalendarTile,
  FacebookTile,
  GalleryTile,
  InfoTile,
  InstagramTile,
  TranspoTile,
  WeatherTile
} from '../tiles'

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
    flex: '1 33%',
    display: 'flex',
    flexDirection: 'column',
    width: '0'
  },
  topLeftRightSection: {
    flex: '1 33%',
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
  topMiddleInfoTile: {
    flex: '1 40%',
    margin: '1vh',
    // width: '0'
  },
  topMiddleGalleryTile: {
    flex: '1 60%',
    margin: '1vh',
    // width: '0'
  },
});

class Grid extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  componentDidMount() {
    this.fetchDatasources()
    setInterval(this.fetchDatasources.bind(this), 60000);
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
    dispatch(setDataStale('gallery'))
    console.log('fetching');

    dispatch(getDataIfNeeded('weather'))
    dispatch(getDataIfNeeded('transpo'))
    dispatch(getDataIfNeeded('calendar'))
    dispatch(getDataIfNeeded('instagram'))
    dispatch(getDataIfNeeded('instagram'))
    dispatch(getDataIfNeeded('facebook'))
    dispatch(getDataIfNeeded('gallery'))
  }

  handleRefreshClick(card) {
    const { dispatch } = this.props
    dispatch(setDataStale(card))
    dispatch(getDataIfNeeded(card))
  }
  render() {
    const { classes, facebook, instagram, gallery, calendar, transpo, weather } = this.props;
    return (
      <div className={classes.root} >
        <div className={classes.topSection}>
          <div className={classes.topLeftRightSection}>
            <GridTile loading={instagram && instagram.isFetching} className={classes.topLeftItems} style= {{marginBottom: '1vh'}}>
              <InstagramTile card={instagram || {}} />
            </GridTile>
            <GridTile loading={ facebook && facebook.isFetching} className={classes.topLeftItems} style= {{marginTop: '1vh'}}>
              <FacebookTile card={facebook || {}} />
            </GridTile>
          </div>
          <div className={classes.topMiddleSection}>
            <GridTile className={classes.topMiddleInfoTile}>
              <InfoTile card={calendar}/>
            </GridTile>
            <GridTile loading={gallery && gallery.isFetching} className={classes.topMiddleGalleryTile}>
              <GalleryTile card={gallery || {}} />
            </GridTile>
          </div>
          <GridTile loading={calendar && calendar.isFetching} className={classes.topLeftRightSection}>
            <CalendarTile card={calendar} />
          </GridTile>
        </div>
        <div className={classes.bottomSection}>
          <GridTile loading={transpo && transpo.isFetching} className={classes.bottomItems}>
            <TranspoTile card={transpo} />
          </GridTile>
          <GridTile loading={weather && weather.isFetching} className={classes.bottomItems}>
            <WeatherTile card={weather} />
          </GridTile>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { ...state.cards }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(mapStateToProps)(withStyles(styles)(Grid));
