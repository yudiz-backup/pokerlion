/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import classnames from 'classnames';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getTournamentCategoryList, getTournamentDetails, getTournamentList, joinTournament, withdrawTournament } from '../../../actions/tournament'
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import info from '../../../assets/images/white-info-icon.svg';
import cup from '../../../assets/images/cup-icon.svg';
import Loading from '../../../components/Loading';


function Tournament(props) {

    const [tournamentTab, setTournamentTab] = useState('5');
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [switchToTournamentList, setSwitchToTournamentList] = useState(false);
    const [switchtoTournamentDetails, setSwitchtoTournamentDetails] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [tournamentList, setTournamentList] = useState([]);
    const [registrationStartDate, setRegistrationStartDate] = useState('');
    const [tournamentStartDate, setTournamentStartDate] = useState('');
    const [entryFee, setEntryFee] = useState(0);
    const [playersJoined, setPlayersJoined] = useState(0);
    const [totaSeat, setTotaSeat] = useState(0);
    const [roundsList, setRoundsList] = useState([]);
    const [prizesList, setPrizesList] = useState([]);
    const [showConfirmJoin, setShowConfirmJoin] = useState(false);
    const [showConfirmWithdraw, setShowConfirmWithdraw] = useState(false);
    const [joinTournamentId, setJoinTournamentId] = useState('');
    const [withdrawTournamentId, setWithdrawTournamentId] = useState('');
    const [tournamentId, setTournamentId] = useState('');
    const [timeoutSeconds, setTimeoutSeconds] = useState(0);

    const dispatch = useDispatch()
    const mainTab = props?.mainTab
    const token = useSelector(state => state.auth.token)
    const categorylistdata = useSelector(state => state.tournament.tournamentCategoryListData)
    const tournamentListData = useSelector(state => state.tournament.tournamentListData)
    const tournamentDetailsData = useSelector(state => state.tournament.tournamentDetailsData)
    const joinTournamentStatus = useSelector(state => state.tournament.joinResStatus)
    const withdrawTournamentStatus = useSelector(state => state.tournament.withdrawResStatus)
    const resMessage = useSelector(state => state.tournament.joinResMessage)
    const previousProps = useRef({ joinTournamentStatus, withdrawTournamentStatus, resMessage }).current

    useEffect(() => {
        if (mainTab === '3') {
            setSwitchToTournamentList(false)
            setSwitchtoTournamentDetails(false)
            setLoading(true)
            dispatch(getTournamentCategoryList(token))
        }
    }, [mainTab])

    useEffect(() => {
        if (categorylistdata) {
            setLoading(false)
            setCategoryList(categorylistdata)
        }
    }, [categorylistdata])

    useEffect(() => {
        if (tournamentTab == '5' && categoryId) {
            setLoading(true)
            dispatch(getTournamentList(categoryId, 'upcoming', token))
        }
        if (tournamentTab == '6' && categoryId) {
            setLoading(true)
            dispatch(getTournamentList(categoryId, 'registrationStarted', token))
        }
        if (tournamentTab == '7' && categoryId) {
            setLoading(true)
            dispatch(getTournamentList(categoryId, 'registered', token))
        }
    }, [tournamentTab, categoryId])

    useEffect(() => {
        if (previousProps.resMessage !== resMessage && resMessage != 'success') {
            if (resMessage?.length) {
                toast(
                    <div>
                        <div>{resMessage}</div>
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
            previousProps.resMessage = resMessage
        }
    }, [resMessage])


    useEffect(() => {
        if (tournamentListData) {
            setLoading(false)
            setTournamentList(tournamentListData)
        }
    }, [tournamentListData])

    useEffect(() => {
        if (previousProps.joinTournamentStatus !== joinTournamentStatus) {
            if (joinTournamentStatus === true) {
                setLoading(false)
                setJoinTournamentId('')
                setShowConfirmJoin(false)
                dispatch(getTournamentList(categoryId, 'registrationStarted', token))
            } else if (joinTournamentStatus === false) {
                setLoading(false)
                setJoinTournamentId('')
                setShowConfirmJoin(false)
                dispatch(getTournamentList(categoryId, 'registrationStarted', token))
            }
        }
        return () => {
            previousProps.joinTournamentStatus = joinTournamentStatus
        }
    }, [joinTournamentStatus])

    useEffect(() => {
        if (previousProps.withdrawTournamentStatus !== withdrawTournamentStatus) {
            if (withdrawTournamentStatus === true) {
                setLoading(false)
                setWithdrawTournamentId('')
                setShowConfirmWithdraw(false)
                setSwitchtoTournamentDetails(false)
                setSwitchToTournamentList(false)
                dispatch(getTournamentList(categoryId, 'registered', token))
            }
            else if (withdrawTournamentStatus === false) {
                setLoading(false)
                setWithdrawTournamentId('')
                setShowConfirmWithdraw(false)
                dispatch(getTournamentList(categoryId, 'registered', token))
            }
        }
        return () => {
            previousProps.withdrawTournamentStatus = withdrawTournamentStatus
        }
    }, [withdrawTournamentStatus])


    useEffect(() => {
        if (tournamentDetailsData) {
            setLoading(false)
            const data = tournamentDetailsData
            setRegistrationStartDate(data?.dJoiningStartAt)
            setTournamentStartDate(data?.dTournamentStartAt)
            setEntryFee(data?.oEntryFee?.nAmount)
            setPlayersJoined(data?.nJoined)
            setTotaSeat(data?.nTotalSeat)
            const seconds = (((data?.nStrategicTime) % 60000) / 1000).toFixed(0);
            setTimeoutSeconds(seconds)

            let roundArray = data?.aRoundInfo?.reverse()
            let roundPrizeArray = []
            let prizeArray = []

            const result = roundArray.map(item => {
                if (item?.aWinning[0]?.nAmount < 1) {
                    return { ...item, nPrize: 'No Prizes' }
                }
                return { ...item }
            })

            for (let i = 0; i < result?.length; i++) {
                let count = 0;
                for (let j = 0; j < result[i].aWinning.length; j++) {
                    let p = result[i].aWinning[j];
                    if (p.nAmount < 1) continue;
                    count++;
                    prizeArray.push({ nFrom: p?.nFrom, nTo: p?.nTo, nTotal: (p?.nTo - p?.nFrom) + 1, nAmount: p?.nAmount })
                }
                roundPrizeArray.push({ ...result[i], prizeCount: count })
            }
            setRoundsList(roundPrizeArray)
            setPrizesList(prizeArray)
        }
    }, [tournamentDetailsData])


    const toogleTournamentTab = tab => {
        if (tournamentTab !== tab) setTournamentTab(tab);
    }

    function handleSwitch(categoryName, categoryId) {
        setSwitchToTournamentList(true)
        setCategory(categoryName)
        setCategoryId(categoryId)
        setTournamentTab('6')
    }

    function dateFormat(date) {
        return moment(date).format("hh:mm A - DD MMMM")
    }

    function handleswitchtoTournamentDetails(id) {
        setLoading(true)
        dispatch(getTournamentDetails(id, token))
        setSwitchToTournamentList(false)
        setSwitchtoTournamentDetails(true)
        setTournamentId(id?.substr(id?.length - 8))
    }
    function confirmJoin(id) {
        setShowConfirmJoin(true)
        setJoinTournamentId(id)
    }

    function confirmWithdraw(id) {
        setShowConfirmWithdraw(true)
        setWithdrawTournamentId(id)
    }

    function handleJoinTournament() {
        setLoading(true)
        dispatch(joinTournament(joinTournamentId, token))
    }

    function handleWithdrawTournament() {
        setLoading(true)
        dispatch(withdrawTournament(withdrawTournamentId, token))
    }


    return (
        <div className="table-cnt-box">
            {loading && <Loading />}
            <div className={(switchToTournamentList || switchtoTournamentDetails) ? "d-none" : "tournament-list"}>
                <div className="row">
                    {
                        !!categoryList?.length && categoryList.map((list, i) => (
                            <div className="col-md-4 text-center" key={i}>
                                <h6 className="text-uppercase">{list?.sName}</h6>
                                <a onClick={() => handleSwitch(list?.sName, list?._id)} className="tournament-img" style={{ backgroundImage: `url(${list?.sLogo})` }}></a>
                            </div>
                        ))
                    }
                    {/* <div className="col-md-4 text-center">
                        <h6 className="text-uppercase">Sunday Freeroll</h6>
                        <Link to="/" className="tournament-img" style={{ backgroundImage: `url(${tournamentImg})` }}></Link>
                    </div> */}
                </div>
            </div>
            <div className={(switchToTournamentList || switchtoTournamentDetails) ? "table-cnt " : "d-none"} >
                <ul className="p-0 list-unstyled d-flex breadcrums">
                    <li>
                        <a onClick={() => { setSwitchToTournamentList(false); setSwitchtoTournamentDetails(false) }} style={{ "cursor": "pointer" }} >Tournament</a>
                    </li>
                    <li>
                        <a onClick={() => { setSwitchtoTournamentDetails(false); setSwitchToTournamentList(true); }} style={{ "cursor": "pointer" }} >{category}</a>
                    </li>
                    {switchtoTournamentDetails && <li>
                        <a>ID: #{tournamentId}</a>
                    </li>}
                </ul>
                <div className={switchToTournamentList ? "tournament-reg" : "d-none"}>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: tournamentTab === '5' })} onClick={() => { toogleTournamentTab('5'); }}>Coming Soon</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: tournamentTab === '6' })} onClick={() => { toogleTournamentTab('6'); }}>Registration Open</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: tournamentTab === '7' })} onClick={() => { toogleTournamentTab('7'); }}>Registered</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={tournamentTab}>
                        <TabPane tabId="5">
                            <div className="tournament-cnt d-flex justify-content-center" >
                                {tournamentList?.length ? tournamentList.map((tl, i) => (
                                    <div className="tournament-dtl mr-2" key={i}>
                                        <div className="dtl-header">
                                            <h6 className="text-center white-text">{tl?.sName}</h6>
                                            <a onClick={() => handleswitchtoTournamentDetails(tl?._id)}><img src={info} alt="info" /></a>
                                        </div>
                                        <div className="reg-price d-flex align-items-center justify-content-center">
                                            <img src={cup} alt="cup" /><p>&#8377; {tl?.nTotalWinning}</p>
                                        </div>
                                        <div className="reg-dtl">
                                            <ul className="m-0 p-0 list-unstyled">
                                                <li className="d-flex align-items-center">
                                                    <p>Entry:</p>
                                                    <p>&#8377;{tl?.oEntryFee?.nAmount}</p>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <p>Starts:</p>
                                                    <p>{dateFormat(tl?.dTournamentStartAt)}</p>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <p>Seats:</p>
                                                    <p>{tl?.nJoined}/{tl?.nTotalSeat}</p>
                                                </li>
                                            </ul>
                                            <div className="d-flex justify-content-center">
                                                <button type="button" disabled className="common-btn yellow-btn small-btn border-0 bg-transparent">COMING SOON</button>
                                            </div>
                                        </div>
                                        <div className="dtl-footer d-flex align-items-center justify-content-center">
                                            <p>REGISTRATION STARTS AT {dateFormat(tl?.dJoiningStartAt)}</p>
                                        </div>
                                    </div>
                                )) :
                                    <div className="tournament-cnt d-flex justify-content-center" >
                                        <p>There is not any tournament coming soon</p>
                                    </div>}
                            </div>
                        </TabPane>
                        <TabPane tabId="6">
                            <div className="tournament-cnt d-flex justify-content-center" >
                                {tournamentList?.length ? tournamentList.map((tl, i) => (
                                    <div className="tournament-dtl mr-2" key={i}>
                                        <div className="dtl-header">
                                            <h6 className="text-center white-text">{tl?.sName}</h6>
                                            <a onClick={() => handleswitchtoTournamentDetails(tl?._id)}><img src={info} alt="info" /></a>
                                        </div>
                                        <div className="reg-price d-flex align-items-center justify-content-center">
                                            <img src={cup} alt="cup" /><p>&#8377; {tl?.nTotalWinning}</p>
                                        </div>
                                        <div className="reg-dtl">
                                            <ul className="m-0 p-0 list-unstyled">
                                                <li className="d-flex align-items-center">
                                                    <p>Entry:</p>
                                                    <p>&#8377;{tl?.oEntryFee?.nAmount}</p>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <p>Starts:</p>
                                                    <p>{dateFormat(tl?.dTournamentStartAt)}</p>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <p>Seats:</p>
                                                    <p>{tl?.nJoined}/{tl?.nTotalSeat}</p>
                                                </li>
                                            </ul>
                                            <div className="d-flex justify-content-center">
                                                <button type="button" disabled={!tl?.canJoin} onClick={() => confirmJoin(tl?._id)} className="common-btn yellow-btn small-btn border-0 bg-transparent">JOIN NOW</button>
                                            </div>
                                        </div>
                                        <div className="dtl-footer d-flex align-items-center justify-content-center">
                                            <p>{tl?.nTotalSeat - tl?.nJoined} SEAT(S) OUT OF {tl?.nTotalSeat} SEAT(S) LEFT!</p>
                                        </div>
                                    </div>
                                )) :
                                    <div className="tournament-cnt d-flex justify-content-center" >
                                        <p>There is not any tournament found for registration</p>
                                    </div>}
                            </div>
                            {/* <div className="tournament-cnt d-flex justify-content-center">
                                <div className="tournament-dtl">
                                    <div className="dtl-header">
                                        <h6 className="text-center white-text">Sunday Freeroll</h6> */}
                            {/* <Button id="UncontrolledPopover" type="button" className="p-0 bg-transparent border-0">
                                                                    <img src={info} alt="info" />
                                                                </Button>
                                                                <UncontrolledPopover placement="bottom" target="UncontrolledPopover" className="pop-desc">
                                                                    <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                                                                </UncontrolledPopover> */}
                            {/* <Link to="/"><img src={info} alt="info" /></Link>
                                    </div>
                                    <div className="reg-price d-flex align-items-center justify-content-center">
                                        <img src={cup} alt="cup" /><p>&#8377; 500</p>
                                    </div>
                                    <div className="reg-dtl">
                                        <ul className="m-0 p-0 list-unstyled">
                                            <li className="d-flex align-items-center">
                                                <p>Entry:</p>
                                                <p>Free</p>
                                            </li>
                                            <li className="d-flex align-items-center">
                                                <p>Starts:</p>
                                                <p>05:30 PM - 22 August</p>
                                            </li>
                                            <li className="d-flex align-items-center">
                                                <p>Seats:</p>
                                                <p>8/36</p>
                                            </li>
                                        </ul>
                                        <div className="d-flex justify-content-center">
                                            <Link to="/" className="common-btn yellow-btn small-btn">join now</Link>
                                        </div>
                                    </div>
                                    <div className="dtl-footer d-flex align-items-center justify-content-center">
                                        <p>28 SEAT(S) OUT OF 36 SEAT(S) LEFT!</p>
                                    </div>
                                </div>
                            </div> */}
                        </TabPane>
                        <TabPane tabId="7">
                            <div className="tournament-cnt d-flex justify-content-center" >
                                {tournamentList?.length ? tournamentList.map((tl, i) => (
                                    <div className="tournament-dtl mr-2" key={i}>
                                        <div className="dtl-header">
                                            <h6 className="text-center white-text">{tl?.sName}</h6>
                                            <a onClick={() => handleswitchtoTournamentDetails(tl?._id)}><img src={info} alt="info" /></a>
                                        </div>
                                        <div className="reg-price d-flex align-items-center justify-content-center">
                                            <img src={cup} alt="cup" /><p>&#8377; {tl?.nTotalWinning}</p>
                                        </div>
                                        <div className="reg-dtl">
                                            <ul className="m-0 p-0 list-unstyled">
                                                <li className="d-flex align-items-center">
                                                    <p>Entry:</p>
                                                    <p>&#8377;{tl?.oEntryFee?.nAmount}</p>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <p>Position:</p>
                                                    <p>{tl?.nParticipantPosition}</p>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <p>Starts:</p>
                                                    <p>{dateFormat(tl?.dTournamentStartAt)}</p>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <p>Seats:</p>
                                                    <p>{tl?.nJoined}/{tl?.nTotalSeat}</p>
                                                </li>
                                            </ul>
                                            <div className="d-flex justify-content-center">
                                                <button type="button" onClick={() => confirmWithdraw(tl?._id)} className="common-btn yellow-btn small-btn border-0 bg-transparent">WITHDRAW</button>
                                            </div>
                                        </div>
                                        <div className="dtl-footer d-flex align-items-center justify-content-center">
                                            <p>TOURNAMENT WILL START AT {dateFormat(tl?.dTournamentStartAt)}</p>
                                        </div>
                                    </div>
                                )) :
                                    <div className="tournament-cnt d-flex justify-content-center" >
                                        <p>You have not registered for any tournament</p>
                                    </div>}
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
                <div className={switchtoTournamentDetails ? "tournamrnt-full-dtl" : "d-none"}>
                    <div className="table-cnt-box full-dtl-table">
                        <div className="tournament-timing">
                            <div className="row align-items-center">
                                <div className="col-md-5 col-lg-6">
                                    <p className="medium-text">Registration Starts at <strong>{dateFormat(registrationStartDate)}</strong></p>
                                    <p className="medium-text">Tournament Starts at <strong className="mb-0">{dateFormat(tournamentStartDate)}</strong></p>
                                </div>
                                <div className="col-md-3 col-lg-3 d-flex align-items-center justify-content-center">
                                    <div className="d-flex align-items-center"><p className="medium-text">Entry Fee</p><p>&#8377; {entryFee}</p></div>
                                </div>
                                <div className="col-md-4 col-lg-3 d-flex align-items-center justify-content-center">
                                    <div className="d-flex align-items-center"><p className="medium-text">Players Joined</p><p>{playersJoined}/{totaSeat}</p></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <table className="common-table table big-padd round-dtl">
                                        <thead>
                                            <tr>
                                                <th colSpan="2" className="text-center">Rounds</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!!roundsList?.length && roundsList?.map((round, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div className="round-no small-text">R{round?.nRound}</div>
                                                        </td>
                                                        <td>
                                                            <p className="medium-text">{round?.nQualifier > 0 ? round?.nQualifier : round?.prizeCount} Qualifier(s) / Table</p>
                                                            {round?.nPrize ?
                                                                <p className="medium-text">{round?.nPrize}</p> :
                                                                <p className="medium-text">{round?.prizeCount} Prizes</p>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            {/* <tr>
                                                <td>
                                                    <div className="round-no small-text">R3</div>
                                                </td>
                                                <td>
                                                    <p className="medium-text">6 Qualifier(s) / Table</p>
                                                    <p className="medium-text">6 Prizes</p>
                                                </td>
                                            </tr>
                                             */}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-7">
                                    <table className="common-table table big-padd round-prize">
                                        <thead>
                                            <tr>
                                                <th colSpan="3" className="text-center">Prizes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!!prizesList?.length && prizesList?.map((prize, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <p className="medium-text">{prize?.nFrom == 1 ? prize?.nFrom + "st" : prize?.nFrom == 2 ? prize?.nFrom + "nd" : prize?.nFrom == 3 ? prize?.nFrom + "rd" : prize?.nFrom + "th"} Position</p>
                                                    </td>
                                                    <td>
                                                        <p className="medium-text">Total {prize?.nTotal} Player(s) ({prize?.nFrom}-{prize?.nTo})</p>
                                                    </td>
                                                    <td>
                                                        <p><strong>&#8377; {prize?.nAmount}</strong></p>
                                                    </td>
                                                </tr>
                                            ))}
                                            {/* <tr>
                                                <td>
                                                    <p className="medium-text">1st Position</p>
                                                </td>
                                                <td>
                                                    <p className="medium-text">Total 1 Player(s) (1-1)</p>
                                                </td>
                                                <td>
                                                    <p><strong>&#8377; 100</strong></p>
                                                </td>
                                            </tr>
                                         */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-cnt-box tournament-rules">
                        <p className="medium-text">There will be {timeoutSeconds} second(s) break between each tournament round. </p>
                        <p className="medium-text">Disclaimer: The number of prizes and rounds will change depending on number of players joining the tournament. </p>
                    </div>
                </div>
            </div>
            <div className={showConfirmJoin ? "edit-auth-dtl active" : "edit-auth-dtl"}>
                <div>
                    <p><strong>Are you sure you want to join this tournament?</strong></p>
                    <div className="d-flex side-btn justify-content-center">
                        <input type="button" className="common-btn yellow-btn small-btn" value="Yes" onClick={handleJoinTournament} />
                        <input type="button" className="common-btn yellow-btn small-btn" value="No" onClick={() => { setShowConfirmJoin(false); setJoinTournamentId('') }} />
                    </div>
                </div>
            </div>
            <div className={showConfirmWithdraw ? "edit-auth-dtl active" : "edit-auth-dtl"}>
                <div>
                    <p><strong>Are you sure you want to withdraw this tournament?</strong></p>
                    <div className="d-flex side-btn justify-content-center">
                        <input type="button" className="common-btn yellow-btn small-btn" value="Yes" onClick={handleWithdrawTournament} />
                        <input type="button" className="common-btn yellow-btn small-btn" value="No" onClick={() => { setShowConfirmWithdraw(false); setWithdrawTournamentId('') }} />
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
    )
}

export default connect()(Tournament)
