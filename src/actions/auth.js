import axios from '../axios'

import { history } from '../App'
import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const register = (sEmail, sPassword, sMobile, iReferredBy, eGender, sState, sPinCode, accessToken) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })
    axios.post('/auth/register', {
        sEmail: sEmail,
        sPassword: sPassword,
        sMobile: "+91" + sMobile,
        eGender: eGender,
        oAddress: {
            sState: sState,
            sPinCode: sPinCode
        },
        ...(iReferredBy ? { iReferredBy: iReferredBy } : {})
    }, accessToken?.length && {
        headers: {
            'accessToken': accessToken
        },
    }).then((response) => {
        dispatch({
            type: constants.REGISTER,
            payload: {
                data: response.headers.verification,
                resStatusReg: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.REGISTER,
            payload: {
                resStatusReg: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}


export const login = (sMobile, sPassword, rememberMe) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })
    axios.post('/auth/login/simple', {
        sMobile: "+91" + sMobile,
        sPassword: sPassword
    }).then((response) => {
        if (rememberMe === true) {
            localStorage.setItem('Token', response.headers.authorization)
        }
        dispatch({
            type: constants.LOGIN,
            payload: {
                token: response.headers.authorization,
                resStatus: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.LOGIN,
            payload: {
                resStatus: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}

export const referralVerify = (sReferralCode) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })
    axios.post('/auth/verify/referral', {
        sReferralCode: sReferralCode
    }).then((response) => {
        dispatch({
            type: constants.REFERRAL,
            payload: {
                data: response.data.data.iReferredBy,
                resStatusReferral: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.REFERRAL,
            payload: {
                resStatusReferral: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}

export const otpVerify = (otp, iVerificationId) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })
    axios.get(`/auth/otp/verify/${otp}`, {
        headers: {
            'verification': iVerificationId
        }
    }).then((response) => {
        response?.headers?.authorization && localStorage.setItem('Token', response.headers.authorization)
        dispatch({
            type: constants.OTP,
            payload: {
                token: response.headers.authorization,
                resStatusOTP: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.OTP,
            payload: {
                resStatusOTP: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}

export const forgotPassword = (sEmail, sMobile) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })
    axios.post('/auth/password/forgot', {
        ...(sMobile?.length ? { sMobile: "+91" + sMobile } : {}),
        ...(sEmail?.length ? { sEmail: sEmail } : {})
    }).then((response) => {
        dispatch({
            type: constants.FORGOTPASSWORD,
            payload: {
                data: response.headers.verification,
                resStatusFP: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.FORGOTPASSWORD,
            payload: {
                resStatusFP: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}

export const resetPasswordVerify = (nOTP, sPassword, iForgotPasswordId) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })
    axios.post('/auth/password/reset', {
        sPassword: sPassword,
        nOTP: nOTP
    }, {
        headers: {
            'verification': iForgotPasswordId
        },

    }).then((response) => {
        dispatch({
            type: constants.RESETPASSWORD,
            payload: {
                resStatusRP: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.RESETPASSWORD,
            payload: {
                resStatusRP: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}

export const resendOTP = (sMobile) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })
    axios.post('/auth/login/mobile', {
        sMobile: "+91" + sMobile
    }).then((response) => {
        dispatch({
            type: constants.RESEND_OTP,
            payload: {
                verificationId: response.headers.verification,
                resStatus: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.RESEND_OTP,
            payload: {
                resStatus: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}

export const logout = (token) => (dispatch) => {
    axios.get('/profile/logout', {
        headers: {
            'authorization': token
        }
    })
        .then(async (response) => {
            localStorage.removeItem('Token')
            localStorage.removeItem('favouritePointPractice')
            localStorage.removeItem('favouritePoolPractice')
            localStorage.removeItem('favouriteDealPractice')
            localStorage.removeItem('favouritePointCash')
            localStorage.removeItem('favouritePoolCash')
            localStorage.removeItem('favouriteDealCash')
            // history.push('/')
            dispatch({
                type: constants.LOGOUT,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.LOGOUT,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}


export const logoutDuetoPasswordChange = () => (dispatch) => {
    dispatch({ type: constants.LOGOUT_PASSWORD_CHANGE })
}

export const socialLogin = (type, idToken, facebookId) => (dispatch) => {
    dispatch({ type: constants.CLEAR_RESPONSE })

    let postData = {}
    if (type === 'Google') {
        postData = { idToken }
    } else {
        postData = { accessToken: idToken, facebookId }
    }

    axios.post('/auth/login/social', postData).then((response) => {
        if (response?.data?.data?.operation !== "registration") {
            localStorage.setItem('Token', response.headers.authorization)
            history.push('/lobby')
        }
        dispatch({
            type: constants.SOCIAL_LOGIN,
            payload: {
                token: response?.data?.data?.operation !== "registration" ? response.headers.authorization : null,
                data: response?.data?.data?.operation === "registration" ? response.data.data : null,
                accessToken: response?.data?.data?.operation === "registration" ? response.headers.accesstoken : null,
                resStatus: true,
                resMessage: response.data.message
            }
        })
    }).catch((error) => {
        dispatch({
            type: constants.SOCIAL_LOGIN,
            payload: {
                mobileNumber: error.response.data.data.sMobile,
                resStatus: false,
                resMessage: error.response ? error.response.data.message : errMsg
            }
        })
    })
}