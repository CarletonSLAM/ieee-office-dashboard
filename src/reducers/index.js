import { combineReducers } from 'redux'

import { cardsStateReducer } from './request'
import { loginStateReducer } from './login'

export default combineReducers({
    cardsStateReducer,
    loginStateReducer
})