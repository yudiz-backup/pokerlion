import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_REFERRAL:
            return {
                ...state,
                data: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.CLEAR_INVITE:
            return {
                data: null,
                resStatus: null,
                resMessage: ''
            }
        default:
            return state

    }
}