import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const reportIssue = (formdata, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_REPORT })
    axios.post('/support/addTicket',
        formdata
        , {
            headers: {
                'authorization': token
            },
        })
        .then((response) => {
            dispatch({
                type: constants.REPORT,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.REPORT,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}