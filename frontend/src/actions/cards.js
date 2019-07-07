import services from '../services'
import {
    loginRefreshBegin,
    loginRefreshSuccess
} from './account';

export const SET_DATA_STALE = 'SET_DATA_STALE'
export const setDataStale = card => ({ type: SET_DATA_STALE, card })

export const REQUEST_DATA = 'REQUEST_DATA'
export const requestData = card => ({ type: REQUEST_DATA, card })


export const RECEIVE_DATA = 'RECEIVE_DATA'
export const receiveData = (card, data) => {
    data.success = true
    return {
        type: RECEIVE_DATA,
        card,
        data,
        lastUpdated: Date.now()
    }
}

export const RECEIVE_ERROR = 'RECEIVE_ERROR'
export const receiveError = (card, error) => ({
    type: RECEIVE_ERROR,
    card,
    error,
    lastUpdated: Date.now()
})


export const fetchData = (card) => (dispatch, getState) => {
    dispatch(requestData(card))
    let errorOccured = false
    let promiseChain
    if (typeof services[card].getAuth === 'function') {
        const { access, refresh } = getState().account.data
        promiseChain = services[card].getAuth(access)
            .catch((error) => {
                if((error.code === 401 || error.code === 403) && getState().account.beginRefresh !== true) {
                    dispatch(loginRefreshBegin())
                    return services.user.loginRefresh(refresh)
                        .then((resJson) => dispatch(loginRefreshSuccess(resJson)))
                }
                else {
                    errorOccured = true
                    dispatch(receiveError(card, { type: 'Auth', code: error.code, error: error.message }))
                }
            })
            .then(services[card].getData)
    } else {
        promiseChain = services[card].getData()
    }
    return promiseChain
        .catch((error) => {
            if (errorOccured === true) return
            errorOccured = true
            if(error.error !== undefined) error = error.error
            if (error.code === 401) {
                const { access, refresh } = getState().account.data
                if(typeof services[card].getAuthRefresh === 'function') {
                    return services[card].getAuthRefresh(access).then(services[card].getData).catch((error) => {
                        dispatch(receiveError(card, { type: 'API', code: error.code, error: error.message }))
                    })
                } else {
                    dispatch(loginRefreshBegin())
                    return services.user.loginRefresh(refresh)
                        .then((resJson) => dispatch(loginRefreshSuccess(resJson)))
                        .then(() => window.location.reload())
                }
            } else {
                dispatch(receiveError(card, { type: 'API', code: error.code, error: error.message }))
            }
        })
        .then(services[card].transformResponse)
        .catch((error) => {
            if (errorOccured === true) return
            errorOccured = true
            dispatch(receiveError(card, { type: 'Transform', code: error.code, error: error.message }))
        })
        .then(data => data && dispatch(receiveData(card, data)))
}


const shouldGetData = (state, card) => {
    const cardData = state.cards[card]
    if (!cardData) {
        return true
    } if (cardData.isFetching) {
        return false
    }
    return cardData.isStale
}

export const getDataIfNeeded = (card) => (dispatch, getState) => {
    if (shouldGetData(getState(), card)) {
        return dispatch(fetchData(card))
    }
}
