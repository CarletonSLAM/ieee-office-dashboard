import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { body, borderRadius } from '../../styles'
import { appName } from '../../App.config'

const styles = {
    frame: {
        background: 'white',
        width: '60%',
        maxWidth: '500px',
        padding: '5%',
        margin: '25vh auto',
        textAlign: 'center',
        borderRadius
    },
    input: {
        width: '100%',
        padding: '1vh',
        margin: '1vh 0',
        boxSizing: 'border-box',
        border: `2px solid ${body.background}`,
        borderRadius,
        fontSize: '1em',
        fontWeight: 'bold',
        color: body.background
    },
    login: {
        width: '50%',
        marginTop: '1vh',
        padding: '1vh',
        fontSize: '1.5vh',
        fontWeight: 'bold',
        backgroundColor: body.background,
        color: 'white',
        marginBottom: '7%',
        borderRadius
    },
    message: {
        display: 'inline-block'
    }
}

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0
    }

      handleChange = (event) => {
          this.setState({
              [event.target.id]: event.target.value
          })
      }

      handleSubmit = (event) => {
          event.preventDefault()
          const { username, password } = this.state
          this.props.onSubmit({ username, password })
      }

      render() {
          const { classes, message } = this.props
          const { username, password } = this.state
          return (
              <div className={classes.frame}>
                  <form onSubmit={this.handleSubmit}>
                      <h2>{ appName || 'App' }</h2>
                      <input className={classes.input} type="text" id="username" placeholder="Username" value={username} onChange={this.handleChange} />
                      <br />
                      <input className={classes.input} type="password" id="password" placeholder="Password" value={password} onChange={this.handleChange} />
                      <div>
                          <button className={classes.login} type="submit">Login</button>
                      </div>
                  </form>
                  <div className={classes.message}>{message || '' }</div>
              </div>
          )
      }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}


export default withStyles(styles)(Login)
