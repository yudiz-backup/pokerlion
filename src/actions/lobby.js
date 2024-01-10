import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getLobbyTableList = (eRummyType, eGameType, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_LOBBY })
    axios.post('/rummy/table/list', {
        eRummyType: eRummyType,
        eGameType: eGameType
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.GET_LOBBY_TABLE_LIST,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_LOBBY_TABLE_LIST,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const joinTable = (iProtoId, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_LOBBY })
    axios.post('/rummy/table/join', {
        iProtoId
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.JOIN_TABLE,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.JOIN_TABLE,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const getJoinedTables = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_LOBBY })
    axios.get('/state', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_JOINED_TABLES,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_JOINED_TABLES,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const getJoinedTournaments = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_LOBBY })
    axios.get('/state/tournament', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_JOINED_TOURNAMENTS,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_JOINED_TOURNAMENTS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const joinPrivateTable = (sPrivateCode, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_LOBBY })
    axios.post('/rummy/table/private/join', {
        sPrivateCode: sPrivateCode
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.JOIN_PRIVATE_TABLE,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.JOIN_PRIVATE_TABLE,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const createPrivateTable = (eRummyType, nTableFee, nMaxPlayer, nRackPercentage, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_LOBBY })
    axios.post('/rummy/table/private/create', {
        eRummyType, nTableFee, nMaxPlayer, nRackPercentage
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.CREATE_PRIVATE_TABLE,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.CREATE_PRIVATE_TABLE,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}