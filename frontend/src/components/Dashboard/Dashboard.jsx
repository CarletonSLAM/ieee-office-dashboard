import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import TileFrame from '../TileFrame'

import tiles from '../tiles'
import EmptyTile from '../tiles/EmptyTile'
import { getDataIfNeeded, setDataStale, getConfig } from '../../actions'
import { serverURL } from '../../App.config'
import services from '../../services'

const styles = {
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    banner: {
        position: 'absolute',
        fontSize: '60%',
        color: '#fff',
        display:'flex',
        top: '0.5%',
        textDecoration: 'underline',
        '&:hover': {
            cursor: 'pointer',
            color: '#fff'
        }
    },
    bannerLink: {
        '&:link': {
            color: '#fff'
        },
        '&:visited': {
            color: '#fff'
        },
        '&:active': {
            color: '#fff'
        }
    },
    bannerPaddng: {
        paddingLeft: '10px',
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.layoutLevels = 0
        this.intervals = []
    }
    async componentDidMount() {
        await this.onDashboardLoad()
    }


    componentWillUnmount() {
        this.intervals.forEach(i => clearInterval(i))
    }

    async onDashboardLoad() {
        await this.props.getConfig()
    }

    fetchDatasource(name, serviceConfig) {
        this.props.setDataStale(name)
        this.props.getDataIfNeeded(name, serviceConfig)
    }

    createLayout(element, index) {
        const flexAmount = (element.h === 1) ? element.w : element.h
        this.layoutLevels++
        if (element.tile) {
            console.log(element.tile)
            const tileName = element.tile.name
            const tileType = tileName[0].toUpperCase() + tileName.slice(1)
            const TileElement = tiles[`${tileType}Tile`]
            // Relay information from calendar to the info tile
            let tileData
            if (tileType === 'Info') {
                tileData = this.props.calendar
            } else {
                tileData = this.props[tileName]
                const serviceConfig = element.tile.config
                const serviceTimeout = services.user.convertConfigTimeoutToMS(serviceConfig.timeout)
                this.intervals.push(setInterval(() => this.fetchDatasource(tileName, serviceConfig), serviceTimeout))
            }
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

    onLogout() {
        window.localStorage.clear()
        window.location.reload()
    }

    render() {
        let { classes, config } = this.props
        this.layoutHasChildren = false
        config = config === undefined ? config : Object.values(config)
        return (
            <>
                {
                    config ?
                    <div className={classes.root}>
                        <div className={classes.banner}>
                            <a className={`${classes.bannerLink} ${classes.bannerPaddng}`} href={serverURL}>Go to Admin Site</a>
                            <div className={classes.bannerPaddng} onClick={this.onLogout.bind(this)}>Logout</div>
                        </div>
                        {config.map(this.createLayout.bind(this))}
                    </div>
                    : <div></div>
                }
            </>
        )
    }
}

const mapStateToProps = state => ({ config: state.account.config, ...state.cards })

const mapDispatchToProps = dispatch => ({
    getDataIfNeeded: (name, serviceConfig) => dispatch(getDataIfNeeded(name, serviceConfig)),
    setDataStale: name => dispatch(setDataStale(name)),
    getConfig: () => dispatch(getConfig()),
})

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    getDataIfNeeded: PropTypes.func.isRequired,
    setDataStale: PropTypes.func.isRequired,
    calendar: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard))
