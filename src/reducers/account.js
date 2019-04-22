import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions'


const loginStateReducer = (state = { data: {}, error: {} , success: false }, action) => {
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
        default:
            return state
    }
}

export default loginStateReducer