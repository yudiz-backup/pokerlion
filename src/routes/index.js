/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Redirect } from 'react-router-dom'
import Home from '../views/auth/index';
import Lobby from '../views/lobby/index';
import myAccount from '../views/myAccount/MyProfile/index'
import GameTransactions from '../views/myAccount/GameTransactions';
import TableTransactions from '../views/myAccount/GameTransactions/TableTransactions/index'
import TournamentTransactions from '../views/myAccount/TournamentTransactions';
import Passbook from '../views/myAccount/Passbook';
import Bonus from '../views/myAccount/Bonus/index'
import Invite from '../views/myAccount/Invite/index'
import Withdraw from '../views/myAccount/Withdraw/index';
import DepositCash from '../views/depositCash/index';
import Report from '../views/myAccount/Report/index';
import ChangePassword from '../views/myAccount/ChangePassword/index';
import Settings from '../views/myAccount/Settings/index';
import Offers from '../views/offers/index'


import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'


const Routes = () => (
    <Switch>
        <PublicRoutes path="/game" component={Home} exact />
        <PrivateRoutes path="/lobby" component={Lobby} exact />
        <PrivateRoutes path="/my-account" component={myAccount} exact />
        <PrivateRoutes path="/change-password" component={ChangePassword} exact />
        <PrivateRoutes path="/settings" component={Settings} exact />
        <PrivateRoutes path="/game-transaction" component={GameTransactions} exact />
        <PrivateRoutes path="/game-transaction/table-transaction/:id" component={TableTransactions} exact />
        <PrivateRoutes path="/tournament-transaction" component={TournamentTransactions} exact />
        <PrivateRoutes path="/passbook" component={Passbook} exact />
        <PrivateRoutes path="/bonus" component={Bonus} exact />
        <PrivateRoutes path="/invite" component={Invite} exact />
        <PrivateRoutes path="/withdraw" component={Withdraw} exact />
        <PrivateRoutes path="/deposit-cash" component={DepositCash} exact />
        <PrivateRoutes path="/report-problem" component={Report} exact />
        <PrivateRoutes path="/offers" component={Offers} exact />
        <Redirect to="/game" />
    </Switch>
)

export default Routes