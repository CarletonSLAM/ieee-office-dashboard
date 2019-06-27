import services from '../services'

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

export const LOGIN_REFRESH_BEGIN = 'LOGIN_REFRESH_BEGIN'
export const loginRefreshBegin = () => ({
    type: LOGIN_REFRESH_BEGIN
})


export const LOGIN_REFRESH_SUCCESS = 'LOGIN_REFRESH_SUCCESS'
export const loginRefreshSuccess = access => ({
    type: LOGIN_REFRESH_SUCCESS,
    access
})



export const performLogin = ({ username, password }) => async (dispatch) => {
    try {
        const resJson = await services.user.login(username, password)
        dispatch(loginSuccess(resJson))
    } catch (error) {
        dispatch(loginFailure(error))
    }
}
