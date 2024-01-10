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

    const [subTab, setSubTab] = useState('9');
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
        if (mainTab === '2' && subTab === '9') {
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
        if (mainTab === '2' && subTab === '10') {
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
        if (mainTab === '2' && subTab === '11') {
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
        if (mainTab === '2' && subTab === '12') {
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
            if (mainTab === '2' && subTab === '9') {
                if (localStorage.getItem('favouritePointCash') === null) {
                    dispatch(getLobbyTableList('point', 'cash', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouritePointCash') || "[]");
                    setTableData(data)
                }
            }
            if (mainTab === '2' && subTab === '10') {
                if (localStorage.getItem('favouritePoolCash') === null) {
                    dispatch(getLobbyTableList('pool', 'cash', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouritePoolCash') || "[]");
                    setTableData(data)
                }
            }
            if (mainTab === '2' && subTab === '11') {
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
        if (mainTab === '2' && subTab === '9') {
            if (localStorage.getItem('favouritePointCash') === null) {
                dispatch(getLobbyTableList('point', 'cash', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouritePointCash') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '2' && subTab === '10') {
            if (localStorage.getItem('favouritePoolCash') === null) {
                dispatch(getLobbyTableList('pool', 'cash', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouritePoolCash') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '2' && subTab === '11') {
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
                            <NavLink className={classnames({ active: subTab === '9' })} onClick={() => { toggleSubTab('9'); }}>All</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '10' })} onClick={() => { toggleSubTab('10'); }}>Texas Hold’em Poker</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '11' })} onClick={() => { toggleSubTab('11'); }}>Omaha</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '12' })} onClick={() => { toggleSubTab('12'); }}>Chinese</NavLink>
                        </NavItem>
                    </Nav>
                    {/* <div className="filter-section d-flex align-items-center">
                        <Button type="button" id="infoTooltipCash" >
                            <img src={info} alt="info" />
                        </Button>
                        <UncontrolledTooltip autohide={false} placement="bottom" target="infoTooltipCash" className="pop-desc">
                            {gameDetails}
                        </UncontrolledTooltip>
                        <button type="button" onClick={() => setFilterToggle(filterToggle => !filterToggle)} className={filterToggle ? "common-btn yellow-btn" : "common-btn"}><img src={filter} alt="filter" />Filter</button>
                    </div> */}
                </div>
                {/* <div className={filterToggle ? "filter-detail show" : "filter-detail hide"}>
                    <div className="d-flex align-items-center">
                        <label htmlFor="chkbox" className="d-flex align-items-center">
                            <div className="custom-checkbox">
                                <input id="chkbox" type="checkbox" checked />
                                <span></span>
                            </div>
                            Filters
                        </label>
                        <ul className="filter-list p-0 d-flex align-items-center">
                            <li>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        Max Players
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <div>
                                            <label htmlFor="chkbox7" className="d-flex align-items-center">
                                                <div className="custom-checkbox">
                                                    <input id="chkbox7" checked={twoPlayerChecked} type="checkbox" value="2" onClick={(e) => handleFilter(e, 'two')} />
                                                    <span></span>
                                                </div>
                                                2 Players
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="chkbox8" className="d-flex align-items-center">
                                                <div className="custom-checkbox">
                                                    <input id="chkbox8" checked={sixPlayerChecked} type="checkbox" value="6" onClick={(e) => handleFilter(e, 'six')} />
                                                    <span></span>
                                                </div>
                                                6 Players
                                            </label>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </li>
                            <li>
                                <button type="button" className='ref-btn border-0 bg-transparent' onClick={resetFilter}><img src={refresh} alt="refresh" />Reset</button>
                            </li>
                        </ul>
                    </div>
                </div> */}
                <TabContent activeTab={subTab}>
                    <TabPane tabId="9">
                        <Table responsive className="common-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Type</th>
                                    <th className="text-center">Blinds</th>
                                    <th className="text-center">Min Buy-in</th>
                                    <th className="text-center"><img src={person} alt="person-ic" /></th>
                                    {/* <th>
                                        <div className="d-flex align-items-center justify-content-center">
                                            max players
                                            <div className="order-filter">
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleAscending("nMaxPlayer")} ><img src={upArrow} alt="up-arrow" /></button>
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleDescending("nMaxPlayer")} ><img src={downArrow} alt="down-arrow" /></button>
                                            </div>
                                        </div>
                                    </th> */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.length ? tableData.map((pointCash, i) =>
                                    <tr key={i}>
                                        {/* <td>
                                            <div className="favourite d-flex ">
                                                <button type="button" onClick={() => handleFavouriteCash(pointCash._id, 'pointCash')} className={pointCash?.favourite ? "active border-0 bg-transparent" : "border-0 bg-transparent"}><img src={star} alt="star" /></button>
                                                <span>{pointCash?.sName}</span>
                                            </div>
                                        </td> */}
                                        <td>Venice</td>
                                        <td className="text-center">No Limit Hold’em</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50 </td>
                                        <td className="text-center">100 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" onClick={() => handlePopup(pointCash?._id)} className="common-btn">Play Now</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                    <>
                                        <tr>
                                            <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                        </tr>
                                    </>}
                                {/* <tr>
                                    <td>
                                        <div className="favourite d-flex ">
                                            <Link to="/" className="active"><img src={star} alt="start" /></Link>
                                            <span>Points Rummy - 2 Player</span>
                                        </div>
                                    </td>
                                    <td className="text-center">2</td>
                                    <td className="text-center">2</td>
                                    <td className="text-center">1.25</td>
                                    <td className="text-center">30</td>
                                    <td>
                                        <div className="text-end">
                                            <Link to="/" className="common-btn">Play Now</Link>
                                        </div>
                                    </td>
                                </tr>
                                 */}
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="10">
                        <Table responsive className="common-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Blinds</th>
                                    <th className="text-center">Min Buy-in</th>
                                    <th className="text-center"><img src={person} alt="person-ic" /></th>
                                    {/* <th>
                                        <div className="d-flex align-items-center justify-content-center">
                                            Type
                                            <div className="order-filter">
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleAscending("nPool")} ><img src={upArrow} alt="up-arrow" /></button>
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleDescending("nPool")} ><img src={downArrow} alt="down-arrow" /></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="d-flex align-items-center justify-content-center">
                                            max players
                                            <div className="order-filter">
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleAscending("nMaxPlayer")} ><img src={upArrow} alt="up-arrow" /></button>
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleDescending("nMaxPlayer")} ><img src={downArrow} alt="down-arrow" /></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="d-flex align-items-center justify-content-center">
                                            Entry Fee
                                            <div className="order-filter">
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleAscending("nEntryFee")} ><img src={upArrow} alt="up-arrow" /></button>
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleDescending("nEntryFee")} ><img src={downArrow} alt="down-arrow" /></button>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="d-flex align-items-center justify-content-center">
                                            Prize
                                            <div className="order-filter">
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleAscending("aWinningAmount[0]")} ><img src={upArrow} alt="up-arrow" /></button>
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleDescending("aWinningAmount[0]")} ><img src={downArrow} alt="down-arrow" /></button>
                                            </div>
                                        </div>
                                    </th> */}
                                    {/* <th className="text-center">Bonus</th> */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.length ? tableData.map((poolCash, i) =>
                                    <tr key={i}>
                                        {/* <td>
                                            <div className="favourite d-flex ">
                                                <button onClick={() => handleFavouriteCash(poolCash._id, 'poolCash')} type="button" className={poolCash?.favourite ? "active border-0 bg-transparent" : "border-0 bg-transparent"}><img src={star} alt="star" /></button>
                                                <span>{poolCash?.sName}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">{poolCash?.nPool}</td>
                                        <td className="text-center">
                                            {poolCash?.nMaxPlayer == 2 ? <div className="gametable-icon-2">&nbsp;</div> : <div className="gametable-icon-6">&nbsp;</div>
                                            }
                                        </td>
                                        <td className="text-center">&#8377;{poolCash?.nEntryFee?.toFixed(2)}</td>
                                        <td className="text-center">{poolCash?.aWinningAmount[0]} &nbsp;
                                            {poolCash?.oBonus?.nValue > 0 &&
                                                <>
                                                    <Button id={`pointCashBtn-${i}`} type="button" className="p-0 bg-transparent border-0" >
                                                        <img src={infoIcon} alt="Info" className='table-info-ico' />
                                                    </Button>
                                                    <UncontrolledTooltip placement="bottom" target={`pointCashBtn-${i}`} className="pop-desc bottom">
                                                        Bonus utilisation for this table is: &#8377;{poolCash?.oBonus?.nValue}
                                                    </UncontrolledTooltip>
                                                </>
                                            }
                                        </td> */}
                                        <td>3 Bots</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50</td>
                                        <td className="text-center">100</td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" onClick={() => handlePopup(poolCash?._id)} className="common-btn">Play Now</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                    <>
                                        <tr>
                                            <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                        </tr>
                                    </>}
                                {/* <tr>
                                    <td>
                                        <div className="favourite d-flex ">
                                            <Link to="/" className="active"><img src={star} alt="start" /></Link>
                                            <span>Pool Rummy - 101 Pool</span>
                                        </div>
                                    </td>
                                    <td className="text-center">101</td>
                                    <td className="text-center">2</td>
                                    <td className="text-center"><span className="fee-icon">25</span></td>
                                    <td className="text-center"><span className="fee-icon">42</span></td>
                                    <td>
                                        <div className="text-end">
                                            <Link to="/" className="common-btn">Play Now</Link>
                                        </div>
                                    </td>
                                </tr>
                             */}
                                <tr>
                                    <td>No Bots</td>
                                    <td className="text-center">1/2 </td>
                                    <td className="text-center">25-50</td>
                                    <td className="text-center">500</td>
                                    <td>
                                        <div className="text-end">
                                            <button type="button" className="common-btn">Play Now</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="11">
                        <Table responsive className="common-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Blinds</th>
                                    <th className="text-center">Min Buy-in</th>
                                    <th className="text-center"><img src={person} alt="person-ic" /></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.length ? tableData.map((dealCash, i) =>
                                    <tr key={i}>
                                        <td>Bot 1</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50</td>
                                        <td className="text-center">100</td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" onClick={() => handlePopup(dealCash?._id)} className="common-btn">Play Now</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                    <>
                                        <tr>
                                            <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                        </tr>
                                    </>}
                                {/* <tr>
                                    <td>
                                        <div className="favourite d-flex ">
                                            <Link to="/" className="active"><img src={star} alt="start" /></Link>
                                            <span>Deal Rummy - 2 Deals</span>
                                        </div>
                                    </td>
                                    <td className="text-center">2</td>
                                    <td className="text-center">2</td>
                                    <td className="text-center"><span className="fee-icon">10</span></td>
                                    <td className="text-center"><span className="fee-icon">20</span></td>
                                    <td>
                                        <div className="text-end">
                                            <Link to="/" className="common-btn">Play Now</Link>
                                        </div>
                                    </td>
                                </tr>
                                 */}
                            </tbody>
                        </Table>
                    </TabPane>
                    <TabPane tabId="12">
                        <Table responsive className="common-table">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Blinds</th>
                                    <th className="text-center">Min Buy-in</th>
                                    <th className="text-center"><img src={person} alt="person-ic" /></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.length ? tableData.map((dealPrac, i) =>
                                    <tr key={i}>
                                        <td>Bot 1</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50</td>
                                        <td className="text-center">100</td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" className="common-btn">Play Now</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                    <>
                                        <tr>
                                            <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                        </tr>
                                    </>}
                                {/* <tr>
                                    <td>
                                        <div className="favourite d-flex ">
                                            <Link to="/" className="active"><img src={star} alt="start" /></Link>
                                            <span>Deal Rummy - 2 Deals</span>
                                        </div>
                                    </td>
                                    <td className="text-center">2</td>
                                    <td className="text-center">2</td>
                                    <td className="text-center"><span className="fee-icon">10</span></td>
                                    <td className="text-center"><span className="fee-icon">20</span></td>
                                    <td>
                                        <div className="text-end">
                                            <Link to="/" className="common-btn">Play Now</Link>
                                        </div>
                                    </td>
                                </tr>
                                 */}
                                 <tr>
                                    <td>Bot 2</td>
                                    <td className="text-center">1/2 </td>
                                    <td className="text-center">10-50</td>
                                    <td className="text-center">100</td>
                                    <td>
                                        <div className="text-end">
                                            <button type="button" className="common-btn">Play Now</button>
                                        </div>
                                    </td>
                                </tr>
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
