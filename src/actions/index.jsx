import services from '../services'

export const SET_DATA_STALE = 'SET_DATA_STALE'
export const setDataStale = card => {
  return { type: SET_DATA_STALE, card }
}

export const REQUEST_DATA = 'REQUEST_DATA'
export const requestData = card => {
  return { type: REQUEST_DATA, card }
}


export const RECEIVE_DATA = 'RECEIVE_DATA'
export const receiveData = (card, data) => {
  return {
    type: RECEIVE_DATA,
    card,
    data,
    lastUpdated: Date.now()
  }
}


export const fetchData = card => dispatch => {
  dispatch(requestData(card))
  return services[card].getData()
    .then(services[card].transformResponse)
    .then(data => dispatch(receiveData(card, data)))
}


function shouldGetData(state, card) {
  const cardData = state.cards[card]
  if (!cardData) {
    return true
  } else if (cardData.isFetching) {
    return false
  } else {
    return cardData.isStale
  }
}

export function getDataIfNeeded(card) {
  return (dispatch, getState) => {
    if (shouldGetData(getState(), card)) {
      return dispatch(fetchData(card))
    }
  }
}
