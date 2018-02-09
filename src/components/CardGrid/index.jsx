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
        spacing: 40,
        className: classes.root,
        container: true,
      },
      top: { width: 4 },
      bottom: { width: 6 },
      middle: {
        spacing: 40,
        container: true,
        tile: {
          width: 12
        }

      }

    }
    console.log(this.props)
    return (
      <Grid {...gridProps.root}>
        <CardTile {...gridProps.top}>
          <AnnoucementCard card={annoucements || {}} />
        </CardTile>

        {/* <Grid item xs={gridProps.top.width}>
          <Grid {...gridProps.middle}>
            <CardTile {...gridProps.middle.tile}>
              <GalleryCard card={gallery || {}} />
            </CardTile>
            <CardTile {...gridProps.middle.tile}>
              <InstagramCard card={instagram || {}} />
            </CardTile>
          </Grid>
        </Grid> */}
        <CardTile {...gridProps.top}>
            <InstagramCard card={instagram || {}} />
        </CardTile>
        <CardTile {...gridProps.top}>
          <CalendarCard card={calendar} />
        </CardTile>

        <CardTile {...gridProps.bottom}>
          <TranspoCard card={transpo} />
        </CardTile>

        <CardTile {...gridProps.bottom}>
          <WeatherCard card={weather} />
        </CardTile>

      </Grid>
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
