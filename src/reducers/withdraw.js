import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.WITHDRAW:
            return {
                ...state,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_WITHDRAW:
            return {
                resMessage: ''
            }
        default:
            return state
    }
}