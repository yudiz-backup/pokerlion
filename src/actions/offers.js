import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getOffers = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_OFFERS })
    axios.get('/store/list?eType=Offer', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_OFFERS,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_OFFERS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}