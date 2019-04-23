import React, { Component } from 'react'
import withStyles from 'react-jss'
import { connect } from 'react-redux'
import { performLogin } from '../../actions'


import Dashboard from '../Dashboard'
import Login from '../Login'
import { body } from '../../styles'

const styles = { body }

class Window extends Component {
    userLogin({ username, password }) {
        debugger
        this.props.performLogin({ username, password })
    }
    render() {
        const { accountSuccess, classes } = this.props
        return (
            <div className={classes.body}>
                {
                    !accountSuccess ?
                    <Login onSubmit={this.userLogin.bind(this)} /> :
                    <Dashboard layout={this.props.layout} services={this.props.services} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { accountSuccess: state.account.success }
}

const mapDispatchToProps = dispatch => {
    return {
      performLogin: ({username, password}) => dispatch(performLogin({username, password})),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Window))
