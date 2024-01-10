import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getReferralCode = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_INVITE })
    axios.get('/profile/generateReferal', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_REFERRAL,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_REFERRAL,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}