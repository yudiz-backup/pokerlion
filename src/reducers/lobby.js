import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_LOBBY_TABLE_LIST:
            return {
                ...state,
                data: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.JOIN_TABLE:
            return {
                ...state,
                joinTableId: action.payload.data,
                joinTableResStatus: action.payload.resStatus,
                joinTableResMessage: action.payload.resMessage
            }
        case constants.GET_JOINED_TABLES:
            return {
                ...state,
                joinedTablesData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.GET_JOINED_TOURNAMENTS:
            return {
                ...state,
                joinedTournamentsData: action.payload.data,
                resStatus: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.JOIN_PRIVATE_TABLE:
            return {
                ...state,
                joinPrivateTableData: action.payload.data,
                joinPrivateTableResStatus: action.payload.resStatus,
                joinPrivateTableResMessage: action.payload.resMessage
            }
        case constants.CREATE_PRIVATE_TABLE:
            return {
                ...state,
                createPrivateTableData: action.payload.data,
                createPrivateTableResStatus: action.payload.resStatus,
                createPrivateTableResMessage: action.payload.resMessage
            }
        case constants.CLEAR_LOBBY:
            return {
                data: null,
                joinTableId: null,
                joinedTablesData: null,
                joinTableResStatus: null,
                joinedTournamentsData: null,
                createPrivateTableResStatus: null,
                resStatus: null,
                joinPrivateTableResStatus: null,
                resMessage: '',
                joinTableResMessage: '',
                joinPrivateTableResMessage: '',
                createPrivateTableResMessage: '',
            }
        default:
            return state
    }
}