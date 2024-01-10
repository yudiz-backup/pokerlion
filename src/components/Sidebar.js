import { React } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import classnames from 'classnames';
import { history } from '../App'

import myProfile from '../assets/images/my-profile.svg';
import chnagePsw from '../assets/images/change-psw.svg';
import gameTrans from '../assets/images/game-transaction.svg';
import passbook from '../assets/images/passbook.svg';
import withdraw from '../assets/images/withdraw.svg';
import settingsic from '../assets/images/setting-ic.png';
import bonus from '../assets/images/bonus.svg';
import invite from '../assets/images/invite.svg';
import about from '../assets/images/about.svg';
import howPlay from '../assets/images/how-play.svg';
import reportProblem from '../assets/images/acc-report-problem.svg';
import terms from '../assets/images/acc-terms-condition.svg';
import privacy from '../assets/images/acc-privacy-policy.svg';


function Sidebar() {

    return (
        <div className="sidebar">
            <ul className="m-0 p-0 list-unstyled">
                <li><Link to="/my-account" className={classnames({ "active": history.location && (history.location.pathname === '/my-account') })}><img src={myProfile} alt="My-profile" />My Profile</Link></li>
                <li><Link to="/change-password" className={classnames({ "active": history.location && (history.location.pathname === '/change-password') })}><img src={chnagePsw} alt="change-password" />Change Password</Link></li>
                <li><Link to="/game-transaction" className={classnames({ "active": history.location && (history.location.pathname === '/game-transaction' || history.location.pathname.includes('/game-transaction/table-transaction')) })}><img src={gameTrans} alt="game-transaction" />Transactions</Link></li>
                {/* <li><Link to="/tournament-transaction" className={classnames({ "active": history.location && (history.location.pathname === '/tournament-transaction') })}><img src={gameTrans} alt="tournament-transactions" />Tournament Transactions</Link></li> */}
                <li><Link to="/withdraw" className={classnames({ "active": history.location && (history.location.pathname === '/withdraw') })}><img src={withdraw} alt="withdraw" />Withdraw</Link></li>
                <li><Link to="/settings" className={classnames({ "active": history.location && (history.location.pathname === '/settings') })}><img src={settingsic} alt="settings-ic" />Settings</Link></li>
                <li><Link to="/bonus" className={classnames({ "active": history.location && (history.location.pathname === '/bonus') })}><img src={bonus} alt="bonus" />Bonus</Link></li>
                <li><Link to="/invite" className={classnames({ "active": history.location && (history.location.pathname === '/invite') })}><img src={invite} alt="invite" />Invite</Link></li>
                {/* <li><Link to="/passbook" className={classnames({ "active": history.location && (history.location.pathname === '/passbook') })}><img src={passbook} alt="passbook" />Passbook</Link></li> */}
                <li><Link to="report-problem" className={classnames({ "active": history.location && (history.location.pathname === '/report-problem') })}><img src={reportProblem} alt="report-problem" />Report Problem</Link></li>
                <li><a target="_blank" href="https://pokerlion.com/how-to-play-poker.php" rel="noreferrer"><img src={howPlay} alt="how-to-play" />How to Play</a></li>
                <li><a target="_blank" href="https://pokerlion.com/terms-condition.php" rel="noreferrer"><img src={terms} alt="terms-and-conditions" />Terms and Conditions</a></li>
                <li><a target="_blank" href="https://pokerlion.com/privacy.php" rel="noreferrer"><img src={privacy} alt="privacy-policy" />Privacy Policy</a></li>
                <li><a target="_blank" href="https://pokerlion.com/about-us.php" rel="noreferrer"><img src={about} alt="about" />About</a></li>
            </ul>
        </div>
    );
}

export default connect()(Sidebar);
