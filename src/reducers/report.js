import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.REPORT:
            return {
                ...state,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage,
            }
        case constants.CLEAR_REPORT:
            return {
                resMessage: '',
                resStatus: null
            }
        default:
            return state
    }
}