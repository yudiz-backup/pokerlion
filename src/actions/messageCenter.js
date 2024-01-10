import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getMessages = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_MESSGAE })
    axios.get('/messageCenter/messages', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_MESSAGE,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_MESSAGE,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}


export const messageReadStatus = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_MESSGAE })
    axios.put('/messageCenter/read', {}, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_READ_STATUS,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_READ_STATUS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}