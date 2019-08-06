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

export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS'
export const getConfigSuccess = config => ({
    type: GET_CONFIG_SUCCESS,
    config
})


export const GET_CONFIG_FAILURE = 'GET_CONFIG_FAILURE'
export const getConfigFailure = error => ({
    type: GET_CONFIG_FAILURE,
    error
})



export const performLogin = ({ username, password }) => async (dispatch) => {
    try {
        const resJson = await services.user.login(username, password)
        dispatch(loginSuccess(resJson))
    } catch (error) {
        dispatch(loginFailure(error))
    }
}


export const getConfig = () => async (dispatch, getState) => {
    try {
        const { access } = getState().account.data
        const resJson = await services.user.getConfig(access)
        return dispatch(getConfigSuccess(resJson))
    } catch (error) {
        return dispatch(getConfigFailure(error))
    }
}
