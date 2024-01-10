import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getBonus = (size, pageNumber, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_BONUS })
    axios.get(`/bonus/list?size=${size}&pageNumber=${pageNumber}`, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_BONUS,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_BONUS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}