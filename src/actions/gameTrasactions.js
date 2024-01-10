import axios from 'axios'
import axiosLocal from '../axios'
import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getGameTrasactions = (size, pageNumber, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_GAME_TRANSACTION })
    axios.get(`https://stag.rummy24.com/api/v2/rummy/transaction/list?size=${size}&pageNumber=${pageNumber}`, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_GAME_TRANSACTIONS,
                payload: {
                    data: response.data.data[0],
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_GAME_TRANSACTIONS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const getTableTrasactions = (size, pageNumber, iTableId, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_GAME_TRANSACTION })
    axiosLocal.get(`/rummy/transaction/list?size=${size}&pageNumber=${pageNumber}&iTableId=${iTableId}`, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_TABLE_TRANSACTIONS,
                payload: {
                    data: response.data.data[0],
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_TABLE_TRANSACTIONS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}