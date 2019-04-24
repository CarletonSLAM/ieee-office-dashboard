import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import TileFrame from '../TileFrame'

import tiles from '../tiles'
import EmptyTile from '../tiles/EmptyTile'
import { getDataIfNeeded, setDataStale } from '../../actions'

const styles = {
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
}

class Dashboard extends Component {
    componentDidMount() {
        this.layoutLevels = 0
        this.onDashboardLoad()
    }


    componentWillUnmount() {
        this.intervals.forEach(i => clearInterval(i))
    }

    onDashboardLoad() {
        this.intervals = this.props.services.map(({ name, timeout }) => {
            this.fetchDatasource(name)
            return setInterval(() => this.fetchDatasource(name), timeout)
        })
    }

    fetchDatasource(name) {
        this.props.setDataStale(name)
        this.props.getDataIfNeeded(name)
    }

    createLayout(element, index) {
        const flexAmount = (element.h === 1) ? element.w : element.h
        this.layoutLevels++
        if (element.tile) {
            const tileType = element.tile[0].toUpperCase() + element.tile.slice(1)
            const TileElement = tiles[`${tileType}Tile`]
            // Relay information from calendar to the info tile
            const tileData = tileType === 'Info' ? this.props.calendar : this.props[element.tile]
            return tileData
                ? (
                    <TileFrame key={`level-${this.layoutLevels}-${index}`} loading={tileData && tileData.isFetching} style={{ flex: `${flexAmount * 100}%`, margin: '1vh' }}>
                        {tileData.error === undefined ? <TileElement card={tileData} /> : <EmptyTile provider={tileType} {...tileData.error} />}
                    </TileFrame>
                ) : <div key={`level-${this.layoutLevels}-${index}`} />
        }

        // Create layout and call function recursively
        const flexDir = element.layout[0].h === 1 ? 'row' : 'column'
        this.layoutHasChildren = true
        return (
            <div
                key={`level-${this.layoutLevels}-${index}`} style={{
                    display: 'flex', flex: `${flexAmount * 100}%`, flexDirection: flexDir, margin: this.layoutHasChildren ? '' : '1vh'
                }}
            >
                {element.layout.map(this.createLayout.bind(this))}
            </div>
        )
    }

    render() {
        const { classes, layout } = this.props
        this.layoutHasChildren = false
        return (
            <div className={classes.root}>
                {layout.map(this.createLayout.bind(this))}
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state.cards })

const mapDispatchToProps = dispatch => ({
    getDataIfNeeded: name => dispatch(getDataIfNeeded(name)),
    setDataStale: name => dispatch(setDataStale(name))
})

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    services: PropTypes.array.isRequired,
    getDataIfNeeded: PropTypes.func.isRequired,
    setDataStale: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
