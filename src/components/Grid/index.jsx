import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridTile from '../GridTile'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import Slider from 'react-slick'

import tiles from '../tiles'

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
});

class Grid extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.layoutLevels = 0;
  }

  createLayout(element, index) {
    const flexAmount = (!element.w && !element.h) ? 1 : ((element.h === 1) ? element.w : element.h)
    this.layoutLevels++;
    if (element.carosel) {
      const caroselLayouts = element.carosel.layout.map(e => ({tile: e}));
      return (
        <div key={`carosel-${this.layoutLevels}-level-${index}`} style={{flex: `${flexAmount * 100}%`, ...element.carosel.style}} >
          <Slider {...element.carosel.settings}>
            {caroselLayouts.map(this.createLayout.bind(this))}
          </Slider>
        </div>
      )
    }
    if (element.tile) {
      console.log(element.tile)
      const tileData = this.props[element.tile]
      const TileElement = tiles[`${element.tile[0].toUpperCase() + element.tile.slice(1)}Tile`]
      return (
        <GridTile key={`level-${this.layoutLevels}-${index}`} hideCard={element.hideCard} loading={tileData && tileData.isFetching} style={{ flex: `${flexAmount * 100}%`, margin: '0.5vh' }}>
          <TileElement card={tileData} />
        </GridTile>
      )
    }

    // Create layout and call function recursively
    const flexDir = element.layout[0].h === 1 ? 'row' : 'column';
    this.layoutHasChildren = true;
    return (
      <div key={`level-${this.layoutLevels}-${index}`} style={{ display: 'flex', flex: `${flexAmount * 100}%`, flexDirection: flexDir, margin: this.layoutHasChildren ? '' : '1vh' }} >
        {element.layout.map(this.createLayout.bind(this))}
      </div>
    )
  }

  render() {
    const { classes, layout } = this.props;
    this.layoutHasChildren = false;
    return (
      <div className={classes.root}>
        {layout.map(this.createLayout.bind(this))}
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
