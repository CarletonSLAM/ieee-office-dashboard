import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import { performLogin, clearLoginMessage } from '../../actions'


import Dashboard from '../Dashboard'
import Login from '../Login'
import { body } from '../../styles'

const styles = { body }

class Window extends Component {
    componentDidMount() {
        this.props.clearLoginMessage()
    }

    userLogin({ username, password }) {
        this.props.performLogin({ username, password })
    }

    render() {
        const { accountSuccess, accountError, classes } = this.props
        return (
            <div className={classes.body}>
                {
                    !accountSuccess
                        ? <Login onSubmit={this.userLogin.bind(this)} message={accountError ? accountError.message : ''} />
                        : <Dashboard layout={this.props.layout} />
                }
            </div>
        )
    }
}


Window.propTypes = {
    classes: PropTypes.object.isRequired,
    layout: PropTypes.array.isRequired,
    performLogin: PropTypes.func.isRequired,
    clearLoginMessage: PropTypes.func.isRequired,
    accountError: PropTypes.object,
    accountSuccess: PropTypes.bool,
}

const mapStateToProps = state => ({
    accountSuccess: state.account.success,
    accountError: state.account.error
})

const mapDispatchToProps = dispatch => ({
    performLogin: ({ username, password }) => dispatch(performLogin({ username, password })),
    clearLoginMessage: () => dispatch(clearLoginMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Window))
