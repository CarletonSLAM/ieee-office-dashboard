import {
    SET_DATA_STALE,
    REQUEST_DATA,
    RECEIVE_DATA
} from '../actions'


const dataStates = (state = { isFetching: false, isStale: false, data: [] }, action) => {
    switch (action.type) {
        case SET_DATA_STALE:
            return Object.assign({}, state, {
                isStale: true
            })
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                isStale: false
            })
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                isStale: false,
                data: action.data,
                lastUpdated: action.lastUpdated
            })
        default:
            return state
    }
}

function cardsStateReducer(state = {}, action) {
    switch (action.type) {
        case SET_DATA_STALE:
        case REQUEST_DATA:
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                cards: Object.assign(state.cards, {
                    [action.card]: dataStates(state.cards[action.card], action)
                })
            })
        default:
            return state
    }
}

export default cardsStateReducer
