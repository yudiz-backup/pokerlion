import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getTournamentTrasactions = (size, pageNumber, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_TOURNAMENT_TRANSACTION })
    axios.get(`/tournament/transaction?size=${size}&pageNumber=${pageNumber}`, {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_TOURNAMENT_TRANSACTION,
                payload: {
                    data: response.data.data[0],
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_TOURNAMENT_TRANSACTION,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}