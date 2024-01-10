/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, Nav, NavItem, NavLink, TabContent, TabPane, Table, Button, UncontrolledTooltip } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import info from '../../../assets/images/info-icon.svg';
import filter from '../../../assets/images/filter-icon.svg';
import refresh from '../../../assets/images/refresh-icon.svg';
import upArrow from '../../../assets/images/up-arrow.svg';
import downArrow from '../../../assets/images/down-arrow.svg';
import star from '../../../assets/images/star.svg';
import person from '../../../assets/images/wt-person.svg';
import infoIcon from '../../../assets/images/table-info-icon.svg';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getJoinedTables, getLobbyTableList, joinTable } from '../../../actions/lobby';
import Loading from '../../../components/Loading';

function Cash(props) {

    const [subTab, setSubTab] = useState('13');
    const [tableData, setTableData] = useState([]);
    const [filterToggle, setFilterToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [maxPlayerFilter, setMaxPlayerFilter] = useState(true);
    const [gameDetails, setGameDetails] = useState('');
    const [showConfirmPlay, setShowConfirmPlay] = useState(false);
    const [tableId, setTableId] = useState('');
    const [twoPlayerChecked, setTwoPlayerChecked] = useState(false);
    const [sixPlayerChecked, setSixPlayerChecked] = useState(false);

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const lobbyTableData = useSelector(state => state.lobby.data)
    const mainTab = props?.mainTab

    useEffect(() => {
        if (lobbyTableData) {
            setLoading(false)
            setTableData(lobbyTableData)
        }
    }, [lobbyTableData])

    const toggleSubTab = tab => {
        if (subTab !== tab) setSubTab(tab);
    }

    useEffect(() => {
        if (mainTab === '3' && subTab === '13') {
            setLoading(true)
            setFilterToggle(false)
            setGameDetails('Play for points which have a pre-decided value. One winner wins the complete prize pool at the end of each game.')
            if (localStorage.getItem('favouritePointCash') === null) {
                dispatch(getLobbyTableList('point', 'cash', token))
            } else {
                setLoading(false)
                const data = JSON.parse(localStorage.getItem('favouritePointCash') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '3' && subTab === '14') {
            setLoading(true)
            setFilterToggle(false)
            setGameDetails('Play until score reaches the maximum limit [101 or 201]. Winner of a deal gets 0 points and the rest accumulate points which are added to their score. A fixed entry fee forms the prize pool.')
            if (localStorage.getItem('favouritePoolCash') === null) {
                dispatch(getLobbyTableList('pool', 'cash', token))
            } else {
                setLoading(false)
                const data = JSON.parse(localStorage.getItem('favouritePoolCash') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '3' && subTab === '15') {
            setLoading(true)
            setFilterToggle(false)
            setGameDetails('Play with chips that are allocated at the beginning of the deal for pre-decided number of deals. One winner wins all the chips at the end of each deal. At the end of pre-decided number of deals, player with  maximum number of chips is selected as the winner for the game.')
            if (localStorage.getItem('favouriteDealCash') === null) {
                dispatch(getLobbyTableList('deal', 'cash', token))
            } else {
                setLoading(false)
                const data = JSON.parse(localStorage.getItem('favouriteDealCash') || "[]");
                setTableData(data)
            }
        }

    }, [mainTab, subTab])

    function handleFavouriteCash(id, type) {
        const matched = tableData.map(t => {
            if (t._id === id) {
                if (t?.favourite) {
                    return { ...t, favourite: false }
                } else {
                    return { ...t, favourite: true }
                }
            }
            return { ...t }
        }
        )
        matched.forEach(function (item, i) {
            if (item?.favourite) {
                matched.splice(i, 1);
                matched.unshift(item);
            }
        });
        if (type == 'pointCash') {
            localStorage.setItem('favouritePointCash', JSON.stringify(matched))
        }
        if (type == 'poolCash') {
            localStorage.setItem('favouritePoolCash', JSON.stringify(matched))
        }
        if (type == 'dealCash') {
            localStorage.setItem('favouriteDealCash', JSON.stringify(matched))
        }
        setTableData(matched)
    }


    function handleAscending(sortType) {
        const tableObj = [...tableData];
        const ascendingSorted = tableObj.sort((a, b) => a[sortType] - b[sortType]);
        setTableData(ascendingSorted)
    }
    function handleDescending(sortType) {
        const tableObj = [...tableData];
        const descendingSorted = tableObj.sort((a, b) => b[sortType] - a[sortType]);
        setTableData(descendingSorted)
    }

    function handleFilter(e, type) {
        setFilterToggle(false)
        setMaxPlayerFilter(maxPlayerFilter => !maxPlayerFilter)
        switch (type) {
            case 'two':
                setTwoPlayerChecked(!twoPlayerChecked)
                break
            case 'six':
                setSixPlayerChecked(!sixPlayerChecked)
                break
        }
        // setFilterToggle(false)
        if (maxPlayerFilter) {
            const tableObj = [...tableData];
            const result = tableObj.filter((tb) => tb.nMaxPlayer == e.target.value);
            setTableData(result)
        } else {
            if (mainTab === '3' && subTab === '13') {
                if (localStorage.getItem('favouritePointCash') === null) {
                    dispatch(getLobbyTableList('point', 'cash', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouritePointCash') || "[]");
                    setTableData(data)
                }
            }
            if (mainTab === '3' && subTab === '14') {
                if (localStorage.getItem('favouritePoolCash') === null) {
                    dispatch(getLobbyTableList('pool', 'cash', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouritePoolCash') || "[]");
                    setTableData(data)
                }
            }
            if (mainTab === '3' && subTab === '15') {
                if (localStorage.getItem('favouriteDealCash') === null) {
                    dispatch(getLobbyTableList('deal', 'cash', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouriteDealCash') || "[]");
                    setTableData(data)
                }
            }
        }
    }

    function resetFilter() {
        setMaxPlayerFilter(true)
        if (mainTab === '3' && subTab === '13') {
            if (localStorage.getItem('favouritePointCash') === null) {
                dispatch(getLobbyTableList('point', 'cash', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouritePointCash') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '3' && subTab === '14') {
            if (localStorage.getItem('favouritePoolCash') === null) {
                dispatch(getLobbyTableList('pool', 'cash', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouritePoolCash') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '3' && subTab === '15') {
            if (localStorage.getItem('favouriteDealCash') === null) {
                dispatch(getLobbyTableList('deal', 'cash', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouriteDealCash') || "[]");
                setTableData(data)
            }
        }

    }

    function handlePopup(tableId) {
        setShowConfirmPlay(true)
        setTableId(tableId)
    }

    function playCashRummy() {
        dispatch(joinTable(tableId, token))
        setShowConfirmPlay(false)
        setTableId('')
    }

    return (
        <div>
            {loading && <Loading />}
            <div className="table-cnt table-cnt-box">
                <div className="d-flex justify-content-between align-items-center">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '13' })} onClick={() => { toggleSubTab('13'); }}>Recommended</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '14' })} onClick={() => { toggleSubTab('14'); }}>Spin Up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '15' })} onClick={() => { toggleSubTab('15'); }}>MTT</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <TabContent activeTab={subTab}>
                    <TabPane tabId="13">
                        <Table responsive className="common-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Type</th>
                                    <th className="text-center" width="240px">Date & Time</th>
                                    <th className="text-center" width="170px">Entry Fee</th>
                                    <th className="text-center">Game</th>
                                    <th className="text-center"><img src={person} alt="person-ic" /></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">11:42 PM, 7th February 2022 </td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">04:09 PM, 10th February 2022</td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">11:42 PM, 7th February 2022 </td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                    </tr> */}
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="14">
                        <Table responsive className="common-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Type</th>
                                    <th className="text-center" width="240px">Date & Time</th>
                                    <th className="text-center" width="170px">Entry Fee</th>
                                    <th className="text-center">Game</th>
                                    <th className="text-center"><img src={person} alt="person-ic" /></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">11:42 PM, 7th February 2022 </td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">04:09 PM, 10th February 2022</td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                    </tr> */}
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="15">
                        <Table responsive className="common-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Type</th>
                                    <th className="text-center" width="240px">Date & Time</th>
                                    <th className="text-center" width="170px">Entry Fee</th>
                                    <th className="text-center">Game</th>
                                    <th className="text-center"><img src={person} alt="person-ic" /></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">11:42 PM, 7th February 2022 </td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">04:09 PM, 10th February 2022</td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">11:42 PM, 7th February 2022 </td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">04:09 PM, 10th February 2022</td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">11:42 PM, 7th February 2022 </td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IkPoker Rush</td>
                                        <td className="text-center">MTT</td>
                                        <td width="240px">04:09 PM, 10th February 2022</td>
                                        <td className="text-center" width="170px">₹ 50 + ₹ 100 <br/> <span>(Entry Fee + Buy In)</span></td>
                                        <td className="text-center">NLH </td>
                                        <td className="text-center">2/6 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Observe</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                    </tr> */}
                            </tbody>
                        </Table>
                    </TabPane>
                </TabContent>
                <div className={showConfirmPlay ? "edit-auth-dtl active" : "edit-auth-dtl"}>
                    <div>
                        <p><strong>Are you sure you want to play this game?</strong></p>
                        <div className="d-flex side-btn justify-content-center">
                            <input type="button" className="common-btn yellow-btn small-btn" value="Play" onClick={playCashRummy} />
                            <input type="button" className="common-btn yellow-btn small-btn" value="Cancel" onClick={() => setShowConfirmPlay(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect()(Cash);
