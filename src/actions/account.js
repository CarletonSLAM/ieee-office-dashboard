import fetch from 'cross-fetch'
import { DJserver } from '../App.config'
import { handleErrors } from '../services/helpers'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const loginSuccess = creds => ({
    type: LOGIN_SUCCESS,
    creds
})


export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    error
})


export const CLEAR_LOGIN_MESSAGE = 'CLEAR_LOGIN_MESSAGE'
export const clearLoginMessage = () => ({
    type: CLEAR_LOGIN_MESSAGE
})


export const performLogin = ({ username, password }) => async (dispatch) => {
    try {
        const response = await fetch(`${DJserver}/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const resJson = await handleErrors(response)
        dispatch(loginSuccess(resJson))
    } catch (error) {
        dispatch(loginFailure(error))
    }
}
