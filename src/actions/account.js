import fetch from 'cross-fetch'
import { DJserver } from '../App.config'
import { handleErrors } from '../services/helpers'

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


export const performLogin = ({username, password}) => async dispatch => {
    try {

        const response = await fetch(`${DJserver}/api/token/`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        const resJson = await handleErrors(response)
        console.log(resJson)
        dispatch(loginSuccess(resJson))
    } catch (error) {
        console.log(error)
        dispatch(loginFailure(error))
    }
}