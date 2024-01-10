import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_GAME_TRANSACTIONS:
            return {
                ...state,
                gameTrasactionsData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.GET_TABLE_TRANSACTIONS:
            return {
                ...state,
                tableTrasactionsData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_GAME_TRANSACTION:
            return {
                gameTrasactionsData: null,
                tableTrasactionsData: null,
                resMessage: ''
            }
        default:
            return state

    }
}