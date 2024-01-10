import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getPromocodeList = (nMinimumAmount, nMaximumAmount, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_DEPOSIT })
    axios.post('/promocode/filter', {
        nMinimumAmount: nMinimumAmount,
        nMaximumAmount: nMaximumAmount
    }, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_PROMOCODE_LIST,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_PROMOCODE_LIST,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}


export const depositCash = (nAmount, iPromoCodeId, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_DEPOSIT })
    axios.post('/transaction/buy', {
        ...(nAmount ? { nAmount: nAmount } : {}),
        ...(iPromoCodeId?.length ? { iPromoCodeId: iPromoCodeId } : {}),
    }, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.ADD_DEPOSIT_CASH,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.ADD_DEPOSIT_CASH,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}