import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CLEAR_LOGIN_MESSAGE,
    LOGIN_REFRESH_SUCCESS
} from '../actions'


const loginStateReducer = (state = { data: {}, error: {}, success: false }, action) => {
    switch (action.type) {
    case LOGIN_SUCCESS:
        delete state.error
        return Object.assign({}, state, {
            success: true,
            data: action.creds
        })
    case LOGIN_FAILURE:
        delete state.data
        return Object.assign({}, state, {
            success: false,
            error: action.error
        })
    case CLEAR_LOGIN_MESSAGE:
        delete state.error
        return Object.assign({}, state)
    case LOGIN_REFRESH_SUCCESS:
        delete state.error
        return Object.assign({}, state, {
            success: true,
            data: Object.assign({}, state.data, {access: action.access})
        })

    default:
        return state
    }
}

export default loginStateReducer
