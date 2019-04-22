import React, { Component } from 'react';
import withStyles from 'react-jss'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
          username: "",
          password: ""
        };
      }

      validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleSubmit = event => {
        event.preventDefault();
        const {username, password} = this.state;
        this.props.onSubmit({username, password})
      }
    render() {
        const { username, password } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <h4>Sign in</h4>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username}onChange={this.handleChange}/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={this.handleChange}/>
                <div>
                    <button color="indigo" type="submit">Login</button>
                </div>
            </form>
        )
    }
}

export default withStyles({})(Login);
