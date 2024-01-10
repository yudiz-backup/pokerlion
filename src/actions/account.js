import axios from '../axios'

import constants from '../constants'

const errMsg = 'Server is unavailable.'

export const getSettings = (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.get('/settings')
        .then((response) => {
            dispatch({
                type: constants.GET_SETTINGS,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_SETTINGS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}


export const getProfile = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.get('/profile?384&283', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.GET_PROFILE,
                payload: {
                    data: response.data.data,
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.GET_PROFILE,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const updateProfile = ({ sUserName = '', sAvatar = '', dDob = '', sState = '', sPinCode = '', token = null }) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.post('/profile', {
        ...(sUserName?.length ? { sUserName: sUserName } : {}),
        ...(sAvatar?.length ? { sAvatar: sAvatar } : {}),
        ...(dDob?.length ? { dDob: dDob } : {}),
        ...((sPinCode?.length || sState?.length) ?
            {
                oAddress: {
                    ...(sPinCode?.length ? { sPinCode: sPinCode } : {}),
                    ...(sState?.length ? { sState: sState } : {})
                }
            } : {})
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.UPDATE_USERNAME,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.UPDATE_USERNAME,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const updateEmail = (sEmail, sPassword, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.put('/profile/email', {
        sEmail: sEmail,
        sPassword: sPassword,
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.UPDATE_EMAIL,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.UPDATE_EMAIL,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const updateMobileNumber = (sMobile, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.put('/profile/mobile', {
        sMobile: sMobile
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.UPDATE_MOBILENUMBER,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.UPDATE_MOBILENUMBER,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const addBank = (sAccountNo, sIFSC, sAccountHolderName, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.post('/profile/add/bank', {
        sAccountNo: sAccountNo,
        sIFSC: sIFSC,
        sAccountHolderName: sAccountHolderName
    }, {
        headers: {
            'authorization': token
        },
    })
        .then((response) => {
            dispatch({
                type: constants.ADD_BANK,
                payload: {
                    resStatusBank: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.ADD_BANK,
                payload: {
                    resStatusBank: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const uploadKYC = (formdata, token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.post('/profile/kyc',
        formdata
        , {
            headers: {
                'authorization': token
            },
        })
        .then((response) => {
            dispatch({
                type: constants.UPLOAD_KYC,
                payload: {
                    resStatusKYC: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.UPLOAD_KYC,
                payload: {
                    resStatusKYC: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}

export const verifyEmailRequest = (sEmail) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.post('/auth/email/resend', {
        sEmail: sEmail,
    })
        .then((response) => {
            dispatch({
                type: constants.VERIFY_EMAIL,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.VERIFY_EMAIL,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}


export const refreshPracticeChips = (token) => (dispatch) => {
    dispatch({ type: constants.CLEAR_ACCOUNT_RESPONSE })
    axios.get('profile/reload/practice/chips', {
        headers: {
            'authorization': token
        }
    })
        .then((response) => {
            dispatch({
                type: constants.REFRESH_PRACTICE_CHIPS,
                payload: {
                    resStatus: true,
                    resMessage: response.data.message
                }
            })
        }).catch((error) => {
            dispatch({
                type: constants.REFRESH_PRACTICE_CHIPS,
                payload: {
                    resStatus: false,
                    resMessage: error.response ? error.response.data.message : errMsg
                }
            })
        })
}