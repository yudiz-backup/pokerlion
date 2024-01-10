// import axios from '../axios'
import axios from 'axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const changePasswordRequest = (sPassword, sNewPassword, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_CHANGE_PASSWORD })
    axios.put('https://stag.rummy24.com/api/v1/profile/password', {
        sPassword: sPassword,
        sNewPassword: sNewPassword
    }, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.CHANGE_PASSWORD,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.CHANGE_PASSWORD,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}
