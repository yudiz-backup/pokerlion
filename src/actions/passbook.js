import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getPassbook = (size, pageNumber, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_PASSBOOK })
    axios.get(`/transaction/list?size=${size}&pageNumber=${pageNumber}`, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_PASSBOOK,
                payload: {
                    data: response.data.data[0],
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_PASSBOOK,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}