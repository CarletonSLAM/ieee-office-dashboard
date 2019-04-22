import { server } from '../App.config'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginSuccess = creds => {
  return {
    type: LOGIN_SUCCESS,
    creds
  }
}


export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error
  }
}



export const performLogin = (uname, pw) => {

}