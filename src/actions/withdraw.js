import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const withdraw = (nAmount, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_WITHDRAW })
    axios.post('/transaction/redeem', {
        nChips: nAmount,
    }, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.WITHDRAW,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.WITHDRAW,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}