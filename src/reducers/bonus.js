import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_BONUS:
            return {
                ...state,
                data: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_BONUS:
            return {
                data: null,
                resMessage: ''
            }
        default:
            return state
    }
}