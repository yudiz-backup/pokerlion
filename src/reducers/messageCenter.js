import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_MESSAGE:
            return {
                ...state,
                data: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.GET_READ_STATUS:
            return {
                ...state,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_MESSGAE:
            return {
                data: null,
                resStatus: null,
                resMessage: ''
            }
        default:
            return state

    }
}