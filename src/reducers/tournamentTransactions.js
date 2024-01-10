import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_TOURNAMENT_TRANSACTION:
            return {
                ...state,
                tournamentTransactionsData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_TOURNAMENT_TRANSACTION:
            return {
                tournamentTransactionsData: null,
                resMessage: ''
            }
        default:
            return state

    }
}