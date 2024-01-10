import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_SETTINGS:
            return {
                ...state,
                data: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessageSettings: action.payload.resMessage
            }
        case constants.GET_PROFILE:
            return {
                ...state,
                dataProfile: action.payload.data,
                resStatusProfile: action.payload.resStatus,
                resMessageProfile: action.payload.resMessage
            }
        case constants.UPDATE_USERNAME:
            return {
                ...state,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.UPDATE_EMAIL:
            return {
                ...state,
                resStatusUpdateEmail: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.UPDATE_MOBILENUMBER:
            return {
                ...state,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.ADD_BANK:
            return {
                ...state,
                resStatusBank: action.payload.resStatusBank,
                resMessage: action.payload.resMessage
            }
        case constants.UPLOAD_KYC:
            return {
                ...state,
                resStatusKYC: action.payload.resStatusKYC,
                resMessage: action.payload.resMessage
            }
        case constants.VERIFY_EMAIL:
            return {
                ...state,
                resStatusVerifyEmail: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.REFRESH_PRACTICE_CHIPS:
            return {
                ...state,
                resStatusRefreshChips: action.payload.resStatus,
                resMessageRefreshChips: action.payload.resMessage
            }
        case constants.CLEAR_ACCOUNT_RESPONSE:
            return {
                resMessage: '',
                data: null,
                resStatus: null,
                resStatusRefreshChips: null,
                dataProfile: null,
                resStatusProfile: false,
            }
        default:
            return state

    }
}