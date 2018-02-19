import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardTile from '../CardTile'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import services from '../../services'

import {
  CalendarCard,
  GalleryCard,
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
      flexGrow: '5',
      display: 'flex',
      flexDirection: 'row'
  },
  bottomSection: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'row'
  },
  items: {
      flexBasis: '50%'
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
    const gridProps = {
      root: {
        className: classes.root
      },
      topSection: {
          className: classes.topSection
      },
      bottomSection: {
        className: classes.bottomSection
      },
      items: {
          className: classes.items
      }

    }
    console.log(this.props)
    return (
      <div {...gridProps.root}>
        <div {...gridProps.topSection}>
            <CardTile {...gridProps.topItems}>
                <AnnoucementCard card={annoucements || {}} />
            </CardTile>
            <CardTile {...gridProps.topItems}>
                <InstagramCard card={instagram || {}} />
            </CardTile>
            <CardTile {...gridProps.topItems}>
                <CalendarCard card={calendar} />
            </CardTile>
        </div>
        <div {...gridProps.bottomSection}>
            <CardTile {...gridProps.items}>
                <TranspoCard card={transpo} />
            </CardTile>
            <CardTile {...gridProps.bottomItems}>
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
