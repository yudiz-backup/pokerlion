import constants from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case constants.REGISTER:
            return {
                ...state,
                verificationId: action.payload.data,
                resStatusReg: action.payload.resStatusReg,
                resMessage: action.payload.resMessage
            }
        case constants.LOGIN:
            return {
                ...state,
                token: action.payload.token,
                resStatusLogin: action.payload.resStatus,
                resMessage: action.payload.resMessage
            }
        case constants.TOKEN_LOGIN: {
            return {
                ...state,
                token: action.payload.token,
            }
        }
        case constants.TOKEN_LOGIN_UNAUTHORIZED: {
            const newState = {
                ...state,
                resStatusLogin: false,
                token: action.payload.token
            }
            return newState
        }
        case constants.REFERRAL:
            return {
                ...state,
                referralId: action.payload.data,
                resStatusReferral: action.payload.resStatusReferral,
                resMessage: action.payload.resMessage
            }
        case constants.OTP:
            return {
                ...state,
                token: action.payload.token,
                resStatusOTP: action.payload.resStatusOTP,
                resMessage: action.payload.resMessage
            }
        case constants.FORGOTPASSWORD:
            return {
                ...state,
                forgotPasswordVerificationId: action.payload.data,
                resStatusFP: action.payload.resStatusFP,
                resMessage: action.payload.resMessage
            }
        case constants.RESETPASSWORD:
            return {
                ...state,
                resStatusRP: action.payload.resStatusRP,
                resMessage: action.payload.resMessage
            }
        case constants.RESEND_OTP:
            return {
                ...state,
                resendOTPVerificationId: action.payload.verificationId,
                resStatusResendOTP: action.payload.resStatus,
                resMessageResendOTP: action.payload.resMessage
            }
        case constants.LOGOUT:
            return {
                resStatusLogout: action.payload.resStatus,
                token: undefined
            }
        case constants.LOGOUT_PASSWORD_CHANGE:
            return {
                token: undefined
            }
        case constants.SOCIAL_LOGIN:
            return {
                ...state,
                token: action.payload.token,
                socialRegistrationData: action.payload.data,
                accessToken: action.payload.accessToken,
                resStatusSocial: action.payload.resStatus,
                resMessage: action.payload.resMessage,
                mobileNumber: action.payload.mobileNumber
            }
        case constants.CLEAR_RESPONSE:
            return {
                resStatus: null,
                resMessage: '',
                socialRegistrationData: null,
                accessToken: null,
                resStatusSocial: null,
                mobileNumber: null,
                resendOTPVerificationId: null,
                resStatusResendOTP: null,
                resMessageResendOTP: '',
                resMessageLogin: ''
            }
        default:
            return state

    }
}