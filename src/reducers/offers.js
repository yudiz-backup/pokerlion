import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_OFFERS:
            return {
                ...state,
                data: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_OFFERS:
            return {
                data: null,
                resStatus: null,
                resMessage: ''
            }
        default:
            return state

    }
}