import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.CHANGE_PASSWORD:
            return {
                ...state,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage,
            }
        case constants.CLEAR_CHANGE_PASSWORD:
            return {
                resMessage: '',
                resStatus: null
            }
        default:
            return state
    }
}