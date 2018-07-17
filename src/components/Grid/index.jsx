import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridTile from '../GridTile'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'

import tiles from '../tiles'
import EmptyTile from '../tiles/EmptyTile';

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
    const flexAmount = (element.h === 1) ? element.w : element.h;
    this.layoutLevels++;    
    if(element.tile) {
      const tileType = element.tile[0].toUpperCase() + element.tile.slice(1);
      const TileElement = tiles[`${tileType}Tile`]
      // Relay information from calendar to the info tile
      const tileData = tileType === 'Info' ? this.props.calendar : this.props[element.tile]
      return tileData ? 
        <GridTile key={`level-${this.layoutLevels}-${index}`} loading={tileData && tileData.isFetching} style={{flex: `${flexAmount*100}%`, margin: '1vh'}}>
          {tileData.data.success ? <TileElement card={tileData}/> : <EmptyTile provider={tileType} {...tileData.data} />}
        </GridTile> : <div key={`level-${this.layoutLevels}-${index}`}/>
      
    }

    // Create layout and call function recursively
    const flexDir = element.layout[0].h === 1  ? 'row' : 'column';
    this.layoutHasChildren = true;
    return (
      <div key={`level-${this.layoutLevels}-${index}`} style={{ display: 'flex', flex: `${flexAmount*100}%`, flexDirection: flexDir, margin: this.layoutHasChildren ? '' : '1vh'}} >
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
