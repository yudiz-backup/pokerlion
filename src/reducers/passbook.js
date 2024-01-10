import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_PASSBOOK:
            return {
                ...state,
                passbookData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_PASSBOOK:
            return {
                passbookData: null,
                resMessage: ''
            }
        default:
            return state

    }
}