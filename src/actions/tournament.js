import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getTournamentCategoryList = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_TOURNAMENT })
    axios.post('/tournament/category/list', {}, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_TOURNAMENT_CATEGORY_LIST,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_TOURNAMENT_CATEGORY_LIST,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const getTournamentList = (iCategoryId, eState, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_TOURNAMENT })
    axios.post(`/tournament/list/${iCategoryId}`, {
        "eState": eState
    }, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_TOURNAMENT_LIST,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_TOURNAMENT_LIST,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const joinTournament = (iTournamentId, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_TOURNAMENT })
    axios.post("/tournament/join", {
        "iTournamentId": iTournamentId
    }, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.JOIN_TOURNAMENT,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.JOIN_TOURNAMENT,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}


export const withdrawTournament = (iTournamentId, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_TOURNAMENT })
    axios.post(`/tournament/withdraw/${iTournamentId}`, {}, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.WITHDRAW_TOURNAMENT,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.WITHDRAW_TOURNAMENT,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}


export const getTournamentDetails = (iTournamentId, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_TOURNAMENT })
    axios.post(`/tournament/view/${iTournamentId}`, {}, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_TOURNAMENT_DETAILS,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_TOURNAMENT_DETAILS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}



