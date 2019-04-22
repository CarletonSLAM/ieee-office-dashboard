import React, { Component } from 'react';
import withStyles from 'react-jss'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
          uname: "",
          password: ""
        };
      }

      validateForm() {
        return this.state.uname.length > 0 && this.state.password.length > 0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleSubmit = event => {
        event.preventDefault();
      }
    render() {
        return (
            <form>
                <h4>Sign in</h4>
                <label htmlFor="uname">Username</label>
                <input type="text" id="uname"/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
                <div>
                    <button color="indigo" type="submit">Login</button>
                </div>
            </form>
        )
    }
}

export default withStyles({})(Login);
