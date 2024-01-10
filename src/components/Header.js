/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, UncontrolledTooltip, PopoverBody, TabContent, TabPane, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, ModalBody } from 'reactstrap';
import classnames from 'classnames';
import { connect, useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { useQueryState } from 'react-router-use-location-state'
import qs from 'query-string'
import { history } from '../App'
import { logout } from '../actions/auth'
import { getProfile, refreshPracticeChips } from '../actions/account';
import { getMessages, messageReadStatus } from '../actions/messageCenter';
import Loading from './Loading';
import logo from '../assets/images/logo.png';
import refresh from '../assets/images/header-refresh-icon.svg';
import wallet from '../assets/images/wallet-icon.svg';
import plus from '../assets/images/plus-icon.svg';
import logOut from '../assets/images/log-out-icon.svg';
import messageIcon from '../assets/images/messages.svg';
import pokerChip from '../assets/images/poker-chip.svg';

function Header(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const [userAvatar, setUserAvatar] = useState('')
    const [userName, setUserName] = useState('')
    const [showConfirmLogoutMessage, setShowConfirmLogoutMessage] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMessageRead, setIsMessageRead] = useState(true);
    const [totalChips, setTotalChips] = useState(0);
    const [practiceChips, setPracticeChips] = useState(0);
    const [messageCenter, setMessageCenter] = useQueryState('modal', '1')

    useEffect(() => {
        dispatch(getProfile(token))
        setLoading(true)
        const obj = qs.parse(location.search)
        obj?.modal === 'messageCenter' && setModal(true); dispatch(getMessages(token))
    }, [])

    const toggleNavbar = () => setIsOpen(!isOpen);

    function toggleModal() {
        setModal(!modal);
        if (modal == true) {
            dispatch(getProfile(token))
            setMessageCenter(null)
        }
    }

    const toggleActiveTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const profileData = useSelector(state => state.account.dataProfile)
    const messageCenterData = useSelector(state => state.messageCenter.data)
    const refreshChipsStatus = useSelector(state => state.account.resStatusRefreshChips)
    const previousProps = useRef({ refreshChipsStatus }).current



    useEffect(() => {
        if (profileData) {
            setLoading(false)
            setUserAvatar(profileData?.sAvatar)
            setUserName(profileData?.sUserName || '')
            setIsMessageRead(profileData?.bMessageRead || false)
            setTotalChips(profileData?.nChips?.toFixed(2) || 0)
            setPracticeChips(profileData?.nPracticeChips || 0)
        }
    }, [profileData])

    useEffect(() => {
        if (messageCenterData) {
            setMessages(messageCenterData[0] ? messageCenterData[0]?.messages : [])
        }
    }, [messageCenterData])

    useEffect(() => {
        if (previousProps.refreshChipsStatus !== refreshChipsStatus) {
            if (refreshChipsStatus === true) {
                setLoading(false)
                dispatch(getProfile(token))
            } else if (refreshChipsStatus === false) {
                setLoading(false)
                dispatch(getProfile(token))
            }
        }
        return () => {
            previousProps.refreshChipsStatus = refreshChipsStatus
        }
    }, [refreshChipsStatus])


    function onLogout(e) {
        e.preventDefault()
        dispatch(logout(token))
        setLoading(false)
    }

    function handleMessageCenter() {
        setModal(!modal)
        setMessageCenter("messageCenter")
        dispatch(getMessages(token))
        dispatch(messageReadStatus(token))
    }

    function dateFormat(date) {
        return moment(date).format("DD/MM/yyyy")
    }

    function handleRefreshChips() {
        setLoading(true)
        dispatch(refreshPracticeChips(token))
        toast(
            <div>
                <div>Refill practice chips if they fall below 5,000.</div>
            </div>,
            {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        );
    }

    return (
        <div>
            {loading && <Loading />}
            <header>
                <Navbar color="light" light expand="md">
                    <Link to="/lobby"><img src={logo} alt="logo" /></Link>
                    <NavbarToggler onClick={toggleNavbar} />
                    <Collapse isOpen={isOpen} navbar className="justify-content-end">
                        <Nav className="ml-auto align-items-center after-login " navbar>
                            <NavItem className={classnames("underline", { "active": history.location && (history.location.pathname === '/lobby') })}>
                                <Link className="nav-link" to="/lobby">Lobby</Link>
                            </NavItem>
                            <NavItem className={classnames("underline", { "active": history.location && (history.location.pathname === '/my-account' || history.location.pathname === '/game-transaction' || history.location.pathname === '/tournament-transaction' || history.location.pathname === '/passbook' || history.location.pathname.includes('/game-transaction/table-transaction')) || history.location.pathname === '/bonus' || history.location.pathname === '/invite' || history.location.pathname === '/withdraw' || history.location.pathname === '/report-problem' || history.location.pathname === '/change-password' })}>
                                <Link className="nav-link" to="/my-account">My Account</Link>
                            </NavItem>
                            <NavItem className={classnames("underline", { "active": history.location && (history.location.pathname === '/offers') })}>
                                <Link className="nav-link" to="/offers">Offers</Link>
                            </NavItem>
                            <NavItem>
                                <Button color="danger" onClick={handleMessageCenter} className="p-0 bg-transparent border-0"><img src={messageIcon} alt="messages" /></Button>
                                {isMessageRead === false && <span className="msg-badge"></span>}
                            </NavItem>
                            <NavItem>
                                <div className="wallet-sec d-flex align-items-center">
                                    <img src={pokerChip} alt="poker-chip" />
                                    <span>{practiceChips}</span>
                                    <a style={{ "cursor": "pointer" }} onClick={handleRefreshChips}><div><img src={refresh} alt="refresh" /></div></a>
                                </div>
                            </NavItem>
                            <NavItem>
                                <div className="wallet-sec d-flex align-items-center">
                                    <img src={wallet} alt="wallet" />
                                    <span>{totalChips}</span>
                                    <Link to="deposit-cash"><div><img src={plus} alt="plus" /></div></Link>
                                </div>
                            </NavItem>
                            <NavItem>
                                <Button id="UncontrolledTooltip" type="button" className="d-flex align-items-center bg-transparent p-0 border-0">
                                    <div className="user-img" style={{ backgroundImage: `url(${userAvatar})` }}></div>
                                    <span className="user-name">Welcome, {userName}!</span>
                                </Button>
                                <UncontrolledTooltip placement="bottom" target="UncontrolledTooltip" className="name-tooltip">
                                    {userName}
                                </UncontrolledTooltip>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => setShowConfirmLogoutMessage(true)} className="logout"><img src={logOut} alt="logOut" /></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
            <Modal isOpen={modal} toggle={toggleModal} className="msg-modal bg-white modal-with-header">
                <div className="modal-cnt">
                    <ModalHeader toggle={toggleModal}>Message Center</ModalHeader>
                    <ModalBody>
                        <div className="text-center no-message">
                            <p>Feature coming soon!</p>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
            {/* <Modal isOpen={modal} toggle={toggleModal} className="msg-modal bg-white modal-with-header">
                <div className="modal-cnt">
                    <ModalHeader toggle={toggleModal}>Message Center</ModalHeader>
                    <div className="message-tabs d-flex">
                        <Nav tabs>
                            {!!messages?.length && messages.map((msg, i) => (
                                <NavItem key={i}>
                                    <NavLink className={classnames({ active: activeTab == (i + 1).toString() })} onClick={() => { toggleActiveTab((i + 1).toString()); }}>
                                        {msg?.sTitle}
                                        <p className="small-text">{dateFormat(msg?.dCreatedDate)}</p>
                                    </NavLink>
                                </NavItem>
                            ))
                            }
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggleActiveTab('1'); }}>
                                    Freeroll Tournament
                                    <p className="small-text">7/9/2021</p>
                                </NavLink>
                            </NavItem>
                           
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            {!!messages?.length && messages.map((msg, i) => (
                                <TabPane tabId={(i + 1).toString()} key={i + 1}>
                                    <h6 className='text-start'>Title: {msg?.sTitle}</h6>
                                    <h6 className='text-start sub-content'>Content:</h6>
                                    <p>{msg?.sDescription}</p>
                                </TabPane>
                            ))
                            }
                            <TabPane tabId="1">
                                <h6>Freeroll Tournament</h6>
                                <p>Hello, Tournament Lovers!! Prices slashed down on Buy-in fee. Join our tournament and GET great discounts on the Buy-in fee. So what are you waiting for? Book your seats now.</p>
                            </TabPane>
                            
                        </TabContent>
                    </div>
                </div>
            </Modal> */}
            <div className={showConfirmLogoutMessage ? "edit-auth-dtl active" : "edit-auth-dtl"}>
                <div>
                    <p><strong>Are you sure you want to Logout?</strong></p>
                    <div className="d-flex side-btn justify-content-center">
                        <input type="button" className="common-btn yellow-btn small-btn" value="Yes" onClick={onLogout} />
                        <input type="button" className="common-btn yellow-btn small-btn" value="No" onClick={() => setShowConfirmLogoutMessage(false)} />
                    </div>
                </div>
            </div>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default connect()(Header);


