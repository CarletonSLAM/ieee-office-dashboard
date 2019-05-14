import { combineReducers } from 'redux'

import cards from './cards'
import account from './account'

export default combineReducers({
    cards,
    account
})
