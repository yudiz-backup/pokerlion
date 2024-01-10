/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
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
import { getLobbyTableList, joinTable } from '../../../actions/lobby';
import Loading from '../../../components/Loading';

function Practice(props) {

    const [subTab, setSubTab] = useState('5');
    const [tableData, setTableData] = useState([]);
    const [filterToggle, setFilterToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [maxPlayerFilter, setMaxPlayerFilter] = useState(true);
    const [gameDetails, setGameDetails] = useState('');
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
        if (mainTab === '1' && subTab === '5') {
            setLoading(true)
            setFilterToggle(false)
            setGameDetails('Play for points which have a pre-decided value. One winner wins the complete prize pool at the end of each game.')
            if (localStorage.getItem('favouritePointPractice') === null) {
                dispatch(getLobbyTableList('point', 'practice', token))
            } else {
                setLoading(false)
                const data = JSON.parse(localStorage.getItem('favouritePointPractice') || "[]");
                setTableData(data)
                // setPointFavourite(data)
            }

        }
        if (mainTab === '1' && subTab === '6') {
            setLoading(true)
            setFilterToggle(false)
            setGameDetails('Play until score reaches the maximum limit [101 or 201]. Winner of a deal gets 0 points and the rest accumulate points which are added to their score. A fixed entry fee forms the prize pool.')
            if (localStorage.getItem('favouritePoolPractice') === null) {
                dispatch(getLobbyTableList('pool', 'practice', token))
            } else {
                setLoading(false)
                const data = JSON.parse(localStorage.getItem('favouritePoolPractice') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '1' && subTab === '7') {
            setLoading(true)
            setFilterToggle(false)
            setGameDetails('Play with chips that are allocated at the beginning of the deal for pre-decided number of deals. One winner wins all the chips at the end of each deal. At the end of pre-decided number of deals, player with  maximum number of chips is selected as the winner for the game.')
            if (localStorage.getItem('favouriteDealPractice') === null) {
                dispatch(getLobbyTableList('deal', 'practice', token))
            } else {
                setLoading(false)
                const data = JSON.parse(localStorage.getItem('favouriteDealPractice') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '1' && subTab === '8') {
            setLoading(true)
            setFilterToggle(false)
            setGameDetails('Play with chips that are allocated at the beginning of the deal for pre-decided number of deals. One winner wins all the chips at the end of each deal. At the end of pre-decided number of deals, player with  maximum number of chips is selected as the winner for the game.')
            if (localStorage.getItem('favouriteDealPractice') === null) {
                dispatch(getLobbyTableList('deal', 'practice', token))
            } else {
                setLoading(false)
                const data = JSON.parse(localStorage.getItem('favouriteDealPractice') || "[]");
                setTableData(data)
            }
        }

    }, [mainTab, subTab])

    function handleStarPracPoint(id, type) {
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

        // const result = matched.filter(res => res.favourite).map(ele => ele._id);
        // console.log('matchedId', result);

        if (type == 'pointPractice') {
            localStorage.setItem('favouritePointPractice', JSON.stringify(matched))
        }
        if (type == 'poolPractice') {
            localStorage.setItem('favouritePoolPractice', JSON.stringify(matched))
        }
        if (type == 'dealPractice') {
            localStorage.setItem('favouriteDealPractice', JSON.stringify(matched))
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
            if (mainTab === '1' && subTab === '5') {
                if (localStorage.getItem('favouritePointPractice') === null) {
                    dispatch(getLobbyTableList('point', 'practice', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouritePointPractice') || "[]");
                    setTableData(data)
                }
            }
            if (mainTab === '1' && subTab === '6') {
                if (localStorage.getItem('favouritePoolPractice') === null) {
                    dispatch(getLobbyTableList('pool', 'practice', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouritePoolPractice') || "[]");
                    setTableData(data)
                }
            }
            if (mainTab === '1' && subTab === '7') {
                if (localStorage.getItem('favouriteDealPractice') === null) {
                    dispatch(getLobbyTableList('deal', 'practice', token))
                } else {
                    const data = JSON.parse(localStorage.getItem('favouriteDealPractice') || "[]");
                    setTableData(data)
                }
            }
        }
    }

    function resetFilter() {
        setMaxPlayerFilter(true)
        if (mainTab === '1' && subTab === '5') {
            if (localStorage.getItem('favouritePointPractice') === null) {
                dispatch(getLobbyTableList('point', 'practice', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouritePointPractice') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '1' && subTab === '6') {
            if (localStorage.getItem('favouritePoolPractice') === null) {
                dispatch(getLobbyTableList('pool', 'practice', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouritePoolPractice') || "[]");
                setTableData(data)
            }
        }
        if (mainTab === '1' && subTab === '7') {
            if (localStorage.getItem('favouriteDealPractice') === null) {
                dispatch(getLobbyTableList('deal', 'practice', token))
            } else {
                const data = JSON.parse(localStorage.getItem('favouriteDealPractice') || "[]");
                setTableData(data)
            }
        }
    }


    function handleGamePopup(tableId) {
        dispatch(joinTable(tableId, token))
    }

    return (
        <div>
            {loading && <Loading />}
            <div className="table-cnt table-cnt-box">
                <div className="d-flex justify-content-between align-items-center">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '5' })} onClick={() => { toggleSubTab('5'); }}>All</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '6' })} onClick={() => { toggleSubTab('6'); }}>Texas Hold’em Poker</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '7' })} onClick={() => { toggleSubTab('7'); }}>Omaha</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: subTab === '8' })} onClick={() => { toggleSubTab('8'); }}>Chinese</NavLink>
                        </NavItem>
                    </Nav>
                    {/* <div className="filter-section d-flex align-items-center">
                        <Button type="button" id="infoTooltip" >
                            <img src={info} alt="info" />
                        </Button>
                        <UncontrolledTooltip autohide={false} placement="bottom" target="infoTooltip" className="pop-desc">
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
                    <TabPane tabId="5">
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
                                            Blinds
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
                                {tableData?.length ? tableData.map((pointPrac, i) => (
                                    <tr key={i}>
                                        {/* <td>
                                            <div className="favourite d-flex ">
                                                <button type="button" onClick={() => handleStarPracPoint(pointPrac._id, 'pointPractice')} className={pointPrac?.favourite ? "active border-0 bg-transparent" : "border-0 bg-transparent"}><img src={star} alt="star" /></button>
                                                <span>{pointPrac?.sName}</span>
                                            </div>
                                        </td> */}
                                        <td>Practice</td>
                                        <td className="text-center">No Limit Hold’em</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50 </td>
                                        <td className="text-center">100 </td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" onClick={() => handleGamePopup(pointPrac?._id)} className="common-btn">Play Now</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                ) :
                                    <>
                                        <tr>
                                            <td colSpan="6" className="text-center">There are no Tables to join.<br /> Please come back later.</td>
                                        </tr>
                                    </>
                                }
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
                    <TabPane tabId="6">
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
                                    </th> */}
                                    {/* <th>
                                        <div className="d-flex align-items-center justify-content-center">
                                            max players
                                            <div className="order-filter">
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleAscending("nMaxPlayer")} ><img src={upArrow} alt="up-arrow" /></button>
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleDescending("nMaxPlayer")} ><img src={downArrow} alt="down-arrow" /></button>
                                            </div>
                                        </div>
                                    </th> */}
                                    {/* <th>
                                        <div className="d-flex align-items-center justify-content-center">
                                            Entry Fee
                                            <div className="order-filter">
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleAscending("nEntryFee")} ><img src={upArrow} alt="up-arrow" /></button>
                                                <button type="button" className="border-0 bg-transparent" onClick={() => handleDescending("nEntryFee")} ><img src={downArrow} alt="down-arrow" /></button>
                                            </div>
                                        </div>
                                    </th> */}
                                    {/* <th>
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
                                {tableData?.length ? tableData.map((poolPrac, i) =>
                                    <tr key={i}>
                                        {/* <td>
                                            <div className="favourite d-flex ">
                                                <button onClick={() => handleStarPracPoint(poolPrac._id, 'poolPractice')} type="button" className={poolPrac?.favourite ? "active border-0 bg-transparent" : "border-0 bg-transparent"}><img src={star} alt="star" /></button>
                                                <span>{poolPrac?.sName}</span>
                                            </div>
                                        </td> */}
                                        {/* <td className="text-center">{poolPrac?.nPool}</td>
                                        <td className="text-center">
                                            {poolPrac?.nMaxPlayer == 2 ? <div className="gametable-icon-2">&nbsp;</div> : <div className="gametable-icon-6">&nbsp;</div>
                                            }
                                        </td>
                                        <td className="text-center">{poolPrac?.nEntryFee?.toFixed(2)}</td>
                                        <td className="text-center">{poolPrac?.aWinningAmount[0]} &nbsp;
                                            {poolPrac?.oBonus?.nValue > 0 &&
                                                <>
                                                    <Button id={`pointCashBtn-${i}`} type="button" className="p-0 bg-transparent border-0" >
                                                        <img src={infoIcon} alt="Info" className='table-info-ico' />
                                                    </Button>
                                                    <UncontrolledTooltip placement="bottom" target={`pointCashBtn-${i}`} className="pop-desc bottom">
                                                        Bonus utilisation for this table is: &#8377;{poolPrac?.oBonus?.nValue}
                                                    </UncontrolledTooltip>
                                                </>
                                            }
                                        </td> */}
                                        <td>Practice</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50</td>
                                        <td className="text-center">100</td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" onClick={() => handleGamePopup(poolPrac?._id)} className="common-btn">Play Now</button>
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
                                    <td>Practice</td>
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
                    <TabPane tabId="7">
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
                                        <td>Practice</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50</td>
                                        <td className="text-center">100</td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" onClick={() => handleGamePopup(dealPrac?._id)} className="common-btn">Play Now</button>
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
                    <TabPane tabId="8">
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
                                        <td>Practice</td>
                                        <td className="text-center">1/2 </td>
                                        <td className="text-center">10-50</td>
                                        <td className="text-center">100</td>
                                        <td>
                                            <div className="text-end">
                                                <button type="button" onClick={() => handleGamePopup(dealPrac?._id)} className="common-btn">Play Now</button>
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
                </TabContent>
            </div>
        </div>
    );
}

export default connect()(Practice);
