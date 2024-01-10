
import { combineReducers } from 'redux'
import auth from './auth'
import account from './account'
import gameTrasactions from './gameTrasactions'
import tournamentTransactions from './tournamentTransactions'
import passbook from './passbook'
import invite from './invite'
import bonus from './bonus'
import withdraw from './withdraw'
import deposit from './deposit'
import changePassword from './changePassword'
import report from './report'
import lobby from './lobby'
import offers from './offers'
import messageCenter from './messageCenter'
import tournament from './tournament'

export default combineReducers({
    auth,
    account,
    gameTrasactions,
    tournamentTransactions,
    passbook,
    invite,
    bonus,
    withdraw,
    deposit,
    changePassword,
    report,
    lobby,
    offers,
    messageCenter,
    tournament,

})
