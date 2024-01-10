import { history, store } from './App'
// import config from "./config"


export function verifyEmail(value) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRex.test(value)) {
        return true
    }
    return false
}

export function verifyPassword(value) {
    const passwordRex = /^[\S]{6,}$/
    if (passwordRex.test(value)) {
        return true
    }
    return false
}

export function verifyLength(value, length) {
    if (value && ((value + "").length >= length)) {
        return true
    }
    return false
}

export function verifyMobileNumber(value) {
    // const mobRex = /^[0-9]{10}$/
    const mobRex = /^[6-9]\d{9}$/
    if (mobRex.test(value)) {
        return true
    }
    return false
}

export function verifyPincode(value) {
    const pinRex = /^[1-9][0-9]{5}$/
    if (pinRex.test(value)) {
        return true
    }
    return false
}

export function verifyIFSCcode(value) {
    const IFSCRex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    if (IFSCRex.test(value)) {
        return true
    }
    return false
}

export function verifyPAN(value) {
    const PANRex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/
    if (PANRex.test(value)) {
        return true
    }
    return false
}


export async function unAuthorized() {
    localStorage.removeItem('Token')
    localStorage.removeItem('favouritePointPractice')
    localStorage.removeItem('favouritePoolPractice')
    localStorage.removeItem('favouriteDealPractice')
    localStorage.removeItem('favouritePointCash')
    localStorage.removeItem('favouritePoolCash')
    localStorage.removeItem('favouriteDealCash')
    store.dispatch({
        type: 'TOKEN_LOGIN_UNAUTHORIZED',
        payload: {
            token: null
        }
    })
    history.replace('/')
}
