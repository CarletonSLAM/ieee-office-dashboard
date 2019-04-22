import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions'


const newLoginState = (state = { accessToken: '', refreshToken: '', expiry: Date.now() }, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                success: true,
                ...action.creds
            })
        case LOGIN_FAILURE:
            if(state.accessToken === []) delete state.accessToken;
            if(state.refreshToken === []) delete state.refreshToken;
            if(state.expiry === []) delete state.expiry;
            return Object.assign({}, state, {
                success: false
            })
        default:
            return state
    }
}


export const loginStateReducer = (state = {account: {}}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                account: Object.assign(state.account, newLoginState(state.account, action))
            })
        default:
            return state
    }
}
