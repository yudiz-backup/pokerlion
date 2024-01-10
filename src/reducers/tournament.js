import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_TOURNAMENT_CATEGORY_LIST:
            return {
                ...state,
                tournamentCategoryListData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.GET_TOURNAMENT_LIST:
            return {
                ...state,
                tournamentListData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.GET_TOURNAMENT_DETAILS:
            return {
                ...state,
                tournamentDetailsData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.JOIN_TOURNAMENT:
            return {
                ...state,
                joinResStatus: action.payload.resStatus,
                joinResMessage: action.payload.resMessage
            }
        case constants.WITHDRAW_TOURNAMENT:
            return {
                ...state,
                withdrawResStatus: action.payload.resStatus,
                joinResMessage: action.payload.resMessage
            }
        case constants.CLEAR_TOURNAMENT:
            return {
                tournamentCategoryListData: null,
                tournamentListData: null,
                tournamentDetailsData: null,
                resStatus: null,
                joinResStatus: null,
                withdrawResStatus: null,
                joinResMessage: '',
                resMessage: ''
            }
        default:
            return state
    }
}