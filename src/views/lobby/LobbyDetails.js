/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap'
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import { useQueryState } from 'react-router-use-location-state'
import qs from 'query-string'
import howPlay from '../../assets/images/how-to-play.svg';
import reportProblem from '../../assets/images/report-problem.svg';
import termsCondition from '../../assets/images/terms-condition.svg';
import privacyPolicy from '../../assets/images/privacy-policy.svg';
import person1 from '../../assets/images/person.svg';
import person2 from '../../assets/images/person.svg';
import { getJoinedTables, getJoinedTournaments, joinPrivateTable } from '../../actions/lobby';
import Practice from './gameType/Practice';
import Cash from './gameType/Cash'
import Tournament from './gameType/Tournament';
import CreatePrivateTable from './components/CreatePrivateTable';
import { getProfile, getSettings } from '../../actions/account';
import Loading from '../../components/Loading';
// import io from 'socket.io-client'
// import config from '../../config'

function LobbyDetails() {

    const [modal, setModal] = useState(false);
    const [activeTabtables, setActiveTabtables] = useState('1');
    const [activeTab, setActiveTab] = useState('1');
    const [joinedTablesList, setJoinedTablesList] = useState([]);
    const [privateTableModal, setPrivateTableModal] = useState(false);
    const [activeTabPrivatetables, setActiveTabPrivatetables] = useState('5');
    const [switchToJoinTable, setSwitchToJoinTable] = useState(false);
    const [switchToCreateTable, setSwitchToCreateTable] = useState(false);
    const [code, setCode] = useState('');
    const [disableJoinTable, setDisableJoinTable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [joinedTableId, seJoinedTableId] = useState([]);
    const [activeMainTab, setActiveMainTab] = useQueryState('activeTab', '1')
    const [activeModal, setActiveModal] = useQueryState('modal', '1')

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const joinedTablesData = useSelector(state => state.lobby.joinedTablesData)
    const joinPrivateTableMessage = useSelector(state => state.lobby.joinPrivateTableResMessage)
    const createPrivateTableMessage = useSelector(state => state.lobby.createPrivateTableResMessage)
    const joinTableStatus = useSelector(state => state.lobby.joinTableResStatus)
    const joinTableMessage = useSelector(state => state.lobby.joinTableResMessage)
    const createPrivateTableStatus = useSelector(state => state.lobby.createPrivateTableResStatus)
    const createPrivateTableData = useSelector(state => state.lobby.createPrivateTableData)
    const joinPrivateTableStatus = useSelector(state => state.lobby.joinPrivateTableResStatus)
    const joinPrivateTableData = useSelector(state => state.lobby.joinPrivateTableData)
    const joinTableId = useSelector(state => state.lobby.joinTableId)

    const previousProps = useRef({ joinPrivateTableMessage, createPrivateTableMessage, joinTableStatus, createPrivateTableStatus }).current

    useEffect(() => {
        document.title = "PokerLion | Lobby"
        dispatch(getJoinedTables(token))
        dispatch(getJoinedTournaments(token))

        const obj = qs.parse(location.search)
        obj?.activeTab && setActiveTab(obj.activeTab)
        obj?.modal === 'MyJoinedGames' && setModal(true)
        obj?.modal === 'privateModal' && setPrivateTableModal(true)
        localStorage.removeItem('RegistrationOTP')
        localStorage.removeItem('LoginOTP')
        localStorage.removeItem('SocialLoginOTP')
        localStorage.removeItem('OTPTimer');
    }, [])


    useEffect(() => {
        if (joinedTablesData) {
            setJoinedTablesList(joinedTablesData)
        }
    }, [joinedTablesData])

    useEffect(() => {
        if (code?.length) {
            setDisableJoinTable(true)
        } else {
            setDisableJoinTable(false)
        }
    }, [code])

    function toggle() {
        setModal(!modal)
        setActiveTabtables('1')
        setActiveModal("MyJoinedGames")
        if (modal === true) {
            setActiveModal(null)
        }
    }

    useEffect(() => {
        if (previousProps.joinTableStatus !== joinTableStatus) {
            if (joinTableStatus === true) {
                dispatch(getJoinedTables(token))
                dispatch(getProfile(token))
                const top = window.top.outerHeight / 2 + window.top.screenY - (590 / 2);
                const left = window.top.outerWidth / 2 + window.top.screenX - (1079 / 2);
                seJoinedTableId([...joinedTableId, joinTableId?.iTableId])
                window.open(`http://rummy24-game-phaser.s3-website.ap-south-1.amazonaws.com?auth_token=${token}&table_id=${joinTableId?.iTableId}&chips=${joinTableId?.nPracticeChips || joinTableId?.nChips}`, `${joinTableId?.iTableId}`, `popup=1, toolbar=0,status=0,width=1079,height=590, top=${top}, left=${left}`);
            }
            if (joinTableStatus === false) {
                if (joinTableMessage !== 'insufficient PokerLion chips') {
                    setModal(true)
                }
                toast(
                    <div>
                        <div>{joinTableMessage}</div>
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
        }
        return () => {
            previousProps.joinTableStatus = joinTableStatus
        }
    }, [joinTableStatus])

    useEffect(() => {
        if (previousProps.joinPrivateTableStatus !== joinPrivateTableStatus) {
            if (joinPrivateTableStatus === true) {
                setLoading(false)
                dispatch(getJoinedTables(token))
                dispatch(getProfile(token))
                setCode('')
                const top = window.top.outerHeight / 2 + window.top.screenY - (590 / 2);
                const left = window.top.outerWidth / 2 + window.top.screenX - (1079 / 2);
                window.open(`http://rummy24-game-phaser.s3-website.ap-south-1.amazonaws.com?auth_token=${token}&table_id=${joinPrivateTableData?.iTableId}&chips=${joinPrivateTableData?.nChips}`, '', `popup=1, toolbar=0,status=0,width=1079,height=590, top=${top}, left=${left}`);
            }
            if (joinPrivateTableStatus === false) {
                if (joinPrivateTableMessage?.length) {
                    setLoading(false)
                    setCode('')
                    toast(
                        <div>
                            <div>{joinPrivateTableMessage}</div>
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
            }
        }
        return () => {
            previousProps.joinPrivateTableStatus = joinPrivateTableStatus
        }
    }, [joinPrivateTableStatus])


    useEffect(() => {
        if (previousProps.createPrivateTableStatus !== createPrivateTableStatus) {
            if (createPrivateTableStatus === true) {
                setLoading(false)
                dispatch(getProfile(token))
                setPrivateTableModal(false)
                const top = window.top.outerHeight / 2 + window.top.screenY - (590 / 2);
                const left = window.top.outerWidth / 2 + window.top.screenX - (1079 / 2);
                window.open(`http://rummy24-game-phaser.s3-website.ap-south-1.amazonaws.com?auth_token=${token}&table_id=${createPrivateTableData?.iTableId}&chips=${createPrivateTableData?.nChips}&privateCode=${createPrivateTableData?.sPrivateCode}`, '', `popup=1, toolbar=0,status=0,width=1079,height=590, top=${top}, left=${left}`);
            }
            if (createPrivateTableStatus === false) {
                setLoading(false)
            }
        }
        return () => {
            previousProps.createPrivateTableStatus = createPrivateTableStatus
        }
    }, [createPrivateTableStatus])


    useEffect(() => {
        if (previousProps.createPrivateTableStatus !== createPrivateTableStatus) {
            if (createPrivateTableStatus === true) {
                dispatch(getJoinedTables(token))
            }
        }
        return () => {
            previousProps.createPrivateTableStatus = createPrivateTableStatus
        }
    }, [createPrivateTableStatus])

    useEffect(() => {
        if (previousProps.createPrivateTableMessage !== createPrivateTableMessage) {
            if (createPrivateTableMessage?.length && createPrivateTableMessage !== "success") {
                setLoading(false)
                toast(
                    <div>
                        <div>{createPrivateTableMessage}</div>
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
        }
        return () => {
            previousProps.createPrivateTableMessage = createPrivateTableMessage
        }
    }, [createPrivateTableMessage])


    function privateTableToggle() {
        setPrivateTableModal(!privateTableModal)
        setActiveModal("privateModal")
        if (privateTableModal === false) {
            dispatch(getSettings)
            setSwitchToJoinTable(false)
            setSwitchToCreateTable(false)
        }
        if (privateTableModal === true) {
            setActiveModal(null)
        }
    }

    const toggletables = tab => {
        if (activeTabtables !== tab) setActiveTabtables(tab);
    }

    const privateTableToggleTables = tab => {
        if (activeTabPrivatetables !== tab) setActiveTabPrivatetables(tab);
    }

    const toogleMainTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    function Mailto({ email, subject = '', body = '', children }) {
        let params = subject || body ? '?' : '';
        return <a href={`mailto:${email}${params}`}>{children}</a>;
    }

    function handleEnterCode(e) {
        setCode(e.target.value)
    }

    function handleJoinTable(e) {
        e.preventDefault();
        setLoading(true)
        dispatch(joinPrivateTable(code, token))
    }

    function joinedGamePopup(tableId) {
        const top = window.top.outerHeight / 2 + window.top.screenY - (590 / 2);
        const left = window.top.outerWidth / 2 + window.top.screenX - (1079 / 2);
        const matchedWindow = joinedTableId.filter(item => {
            return item === tableId;
        });
        if (matchedWindow) {
            window.open(`http://rummy24-game-phaser.s3-website.ap-south-1.amazonaws.com?auth_token=${token}&table_id=${tableId}&chips=30`, `${matchedWindow}`, `popup=1, toolbar=0,status=0,width=1079,height=590, top=${top}, left=${left}`);
        } else {
            window.open(`http://rummy24-game-phaser.s3-website.ap-south-1.amazonaws.com?auth_token=${token}&table_id=${tableId}&chips=30`, "", `popup=1, toolbar=0,status=0,width=1079,height=590, top=${top}, left=${left}`);
        }
    }


    return (
        <div>
            {loading && <Loading />}
            <div className="main-content">
                <div className="point-table">
                    <div className="container">
                        <div className="tab-header d-flex align-items-center justify-content-between">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toogleMainTab('1'); setActiveMainTab('1') }}>Free Game</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toogleMainTab('2'); setActiveMainTab('2') }}>Cash</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toogleMainTab('3'); setActiveMainTab('3') }}>Tournament</NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toogleMainTab('4'); setActiveMainTab('4') }}>Club</NavLink>
                                </NavItem> */}
                            </Nav>
                            <div className="d-flex align-items-center">
                                <Button className="common-btn yellow-btn" style={{ "marginRight": "15px" }} onClick={privateTableToggle}>Private Table</Button>
                                <Button className="common-btn yellow-btn" onClick={toggle} >My Joined Games ({joinedTablesList?.length})</Button>
                                <Modal isOpen={modal} toggle={toggle} className="join-modal">
                                    <ModalHeader toggle={toggle} className="text-center">My Joined Games ({joinedTablesList?.length})</ModalHeader>
                                    <ModalBody>
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink className={classnames({ active: activeTabtables === '1' })} onClick={() => { toggletables('1'); }}>
                                                    Tables
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink className={classnames({ active: activeTabtables === '2' })} onClick={() => { toggletables('2'); }}>
                                                    Tournament
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={activeTabtables}>
                                            <TabPane tabId="1">
                                                <div className="table-inner d-flex justify-content-center align-items-center">
                                                    {joinedTablesList?.length ? joinedTablesList.map((joinedtable, i) => (
                                                        <div className="table-content text-center" key={i}>
                                                            <p className="points-btn">
                                                                <span>{joinedtable?.eRummyType == "point" ? 'Points PokerLion' : joinedtable?.eRummyType == 'pool' ? 'Pools Rummy' : 'Deals Rummy'}</span>
                                                                <div className='table-player'>
                                                                    {joinedtable?.nMaxPlayer == 2 ?
                                                                        <>
                                                                            <img src={person1} alt="person-image" className='player-2' />
                                                                            <img src={person1} alt="person-image" className='player-5' />
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <img src={person1} alt="person-image" className='player-1' />
                                                                            <img src={person1} alt="person-image" className='player-2' />
                                                                            <img src={person1} alt="person-image" className='player-3' />
                                                                            <img src={person1} alt="person-image" className='player-4' />
                                                                            <img src={person1} alt="person-image" className='player-5' />
                                                                            <img src={person1} alt="person-image" className='player-6' />
                                                                        </>
                                                                    }
                                                                </div>
                                                            </p>
                                                            <div className="points-inner d-flex justify-content-between">
                                                                <div>
                                                                    <p>{joinedtable?.eRummyType == "point" ? 'Decks' : joinedtable?.eRummyType == 'pool' ? 'Type' : 'Deals'}</p>
                                                                    <span>{joinedtable?.eRummyType == "point" ? '2' : joinedtable?.eRummyType == 'pool' ? joinedtable?.nPool : joinedtable?.nDeal}</span>
                                                                </div>
                                                                <div>
                                                                    <p>{joinedtable?.eRummyType == "point" ? 'Points Value' : joinedtable?.eRummyType == 'pool' ? 'Entry Fee' : 'Entry Fee'}</p>
                                                                    <span>{joinedtable?.eRummyType == "point" ? joinedtable?.nPoint?.toFixed(2) : joinedtable?.eRummyType == 'pool' ? joinedtable?.nEntryFee : joinedtable?.nEntryFee}</span>
                                                                </div>
                                                                <div>
                                                                    <p>{joinedtable?.eRummyType == "point" ? 'Min Entry' : joinedtable?.eRummyType == 'pool' ? 'Prize' : 'Prize'}</p>
                                                                    <span>{joinedtable?.eRummyType == "point" ? joinedtable?.nMinEntry : joinedtable?.eRummyType == 'pool' ? joinedtable?.aWinningAmount[0] : joinedtable?.aWinningAmount[0]}</span>
                                                                </div>
                                                            </div>
                                                            <Button type="button" onClick={() => joinedGamePopup(joinedtable?._id)} className="common-btn yellow-btn">Join</Button>
                                                        </div>
                                                    )) : <div className="text-center no-tournment">
                                                        <p>You haven&apos;t yet joined any Tables.</p>
                                                    </div>}
                                                </div>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <div className="text-center no-tournment">
                                                    <p>No Tournaments Found!</p>
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </ModalBody>
                                </Modal>
                                <Modal isOpen={privateTableModal} toggle={privateTableToggle} className="join-modal">
                                    <ModalHeader toggle={privateTableToggle} className="text-center">Private Table</ModalHeader>
                                    <ModalBody>
                                        {/* Join Table Section */}
                                        {/* <div className={switchToJoinTable || switchToCreateTable ? 'd-none' : "d-flex align-items-center justify-content-center no-tournment side-btn"}>
                                            <button type='button' onClick={() => setSwitchToJoinTable(true)} className="common-btn yellow-btn small-btn">Join Table</button>
                                            <button type='button' onClick={() => setSwitchToCreateTable(true)} className="common-btn yellow-btn small-btn">CREATE TABLE</button>
                                        </div> */}
                                        {/* search-bar */}
                                        {/* <div className={switchToJoinTable ? 'join-search no-tournment' : 'd-none'}>
                                            <Form onSubmit={handleJoinTable} className='d-flex justify-content-between align-items-center'>
                                                <FormGroup>
                                                    <Input type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 6)} maxLength="6" onChange={handleEnterCode} value={code} name="text" id="exampletext" placeholder="Enter Code and Join Table" />
                                                </FormGroup>
                                                <Button type='submit' disabled={!disableJoinTable} className='common-btn yellow-btn flex-shrink-0'>JOIN</Button>
                                            </Form>
                                        </div> */}
                                        {/* <div className={switchToCreateTable ? '' : 'd-none'}>
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTabPrivatetables === '5' })}
                                                        onClick={() => { privateTableToggleTables('5'); }}
                                                    >
                                                        2 Players
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: activeTabPrivatetables === '6' })}
                                                        onClick={() => { privateTableToggleTables('6'); }}
                                                    >
                                                        6 Players
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={activeTabPrivatetables}>
                                                <TabPane tabId="5">
                                                    <CreatePrivateTable playerTab={activeTabPrivatetables} />
                                                </TabPane>
                                                <TabPane tabId="6">
                                                    <CreatePrivateTable playerTab={activeTabPrivatetables} />
                                                </TabPane>
                                            </TabContent>
                                        </div> */}
                                        <div className="text-center no-tournment">
                                            <p>Feature coming soon!</p>
                                        </div>
                                    </ModalBody>
                                </Modal>
                            </div>
                        </div>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Practice mainTab={activeTab} />
                            </TabPane>
                            <TabPane tabId="2">
                                <Cash mainTab={activeTab} />
                            </TabPane>
                            <TabPane tabId="3">
                                <Tournament mainTab={activeTab} />
                            </TabPane>
                            {/* <TabPane tabId="4">
                                <div className="table-cnt table-cnt-box">
                                    <h1 className="text-center">Coming Soon</h1>
                                </div>
                            </TabPane> */}
                        </TabContent>
                        <div className="about-game">
                            <ul className="d-flex align-items-center justify-content-center m-0 p-0 list-unstyled">
                                <li>
                                    <a target="_blank" href="https://pokerlion.com/how-to-play-poker.php" rel="noreferrer"><img src={howPlay} alt="how-play" />How to Play</a>
                                </li>
                                <li>
                                    <Link to="/report-problem"><img src={reportProblem} alt="report-problem" />Report Problem</Link>
                                </li>
                                <li>
                                    <a target="_blank" href="https://pokerlion.com/terms-condition.php" rel="noreferrer"><img src={termsCondition} alt="termsCondition" />Terms and Conditions</a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://pokerlion.com/privacy.php" rel="noreferrer"><img src={privacyPolicy} alt="privacyPolicy" />Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center queries-mail">
                    <p>For any queries, contact us on <Mailto className="common-link" email="care@pokerlion.com" subject=""><strong>care@pokerlion.com</strong></Mailto></p>
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

export default connect()(LobbyDetails);
