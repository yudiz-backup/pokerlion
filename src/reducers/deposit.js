import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_PROMOCODE_LIST:
            return {
                ...state,
                listData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.ADD_DEPOSIT_CASH:
            return {
                ...state,
                depositData: action.payload.data,
                resStatusDeposit: action.payload.resStatus,
                resMessageDeposit: action.payload.resMessage
            }
        case constants.CLEAR_DEPOSIT:
            return {
                listData: null,
                depositData: null,
                resMessage: ''
            }
        default:
            return state
    }
}