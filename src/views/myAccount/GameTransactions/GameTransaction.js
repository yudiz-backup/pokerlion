import { React, useState, useEffect } from 'react';
import Select from 'react-select'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getGameTrasactions } from '../../../actions/gameTrasactions'
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading'


function GameTransaction() {

    const [gameTransactions, setGameTransactions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [firstPage, setFirstPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const gameTrasactionsData = useSelector(state => state.gameTrasactions.gameTrasactionsData)


    useEffect(() => {
        dispatch(getGameTrasactions(pageSize, currentPage, token))
        setLoading(true)
    }, [currentPage, pageSize])

    useEffect(() => {
        document.title = "PokerLion | My Account"
    }, [])


    useEffect(() => {
        if (gameTrasactionsData?.transactions?.length) {
            setGameTransactions(gameTrasactionsData?.transactions)
            setPageCount(Math.ceil(gameTrasactionsData?.count[0]?.totalData / pageSize));
            setTotalData(gameTrasactionsData?.count[0]?.totalData)
            setLoading(false)
        }
        else if (gameTrasactionsData) {
            setLoading(false)
        }
    }, [gameTrasactionsData])


    function dateFormat(date) {
        return moment(date).format("MMM DD yyyy hh:mm A")
    }

    const handlePageClick = async (data) => {
        setCurrentPage(data.selected)
    }


    function handlePageSize(e) {
        if (Number(e.target.value) > 10) {
            setCurrentPage(0)
            setFirstPage(true)
        }
        setPageSize(Number(e.target.value))
        setPageCount(Math.ceil(totalData / e.target.value))
    }
    const source = [
        { value: 'All', label: 'All' },
        { value: 'Source 1', label: 'Source 1' },
        { value: 'Source 2', label: 'Source 2' },
    ];
    const type = [
        { value: 'All', label: 'All' },
        { value: 'Type 1', label: 'Type 1' },
        { value: 'Type 2', label: 'Type 2' },
    ];
    const dc = [
        { value: 'All', label: 'All' },
        { value: 'D/C 1', label: 'D/C 1' },
        { value: 'D/C 2', label: 'D/C 2' },
    ];

    return (
        <>
            {loading && <Loading />}
            <div className="account-cnt">
                <div className="game-transaction-section">
                    <h3 className="text-center account-title">Transactions</h3>
                    <div className="filter-tran">
                    <form>
                        <div className="d-flex">
                            <div className="form-group pass-field">
                                <label className="label">Source</label>
                                <Select
                                    options={source}
                                    placeholder='Select an Source'
                                />
                            </div>
                            <div className="form-group pass-field">
                                <label className="label">Type</label>
                                <Select
                                    options={type}
                                    placeholder='Select an Source'
                                />
                            </div>
                            <div className="form-group pass-field">
                                <label className="label">D/C</label>
                                <Select
                                    options={dc}
                                    placeholder='Select an Source'
                                />
                            </div>
                            <button type="button" className='common-btn small-btn'>Apply</button>
                        </div>
                    </form>
                    </div>
                    {gameTransactions?.length ?
                        <div className="table-cnt table-cnt-box br-6">
                            <div className="table-responsive">
                                <table className="common-table table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Date & Time</th>
                                            <th className="text-center">D/C</th>
                                            <th className="text-center">Amount</th>
                                            <th className="text-center">Closing Balance</th>
                                            <th className="text-center">Type</th>
                                            <th className="text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                July 17, 2021, 04:09 PM
                                            </td>
                                            <td className="text-center">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                &#8377; 100
                                            </td>
                                            <td className="text-center">
                                                &#8377; 9850
                                            </td>
                                            <td className="text-center">
                                                tournamentBuyIn
                                            </td>
                                            <td className="text-center">
                                                Sucess
                                            </td>
                                            {/* <td className="text-center">
                                                    {gameTransaction.dCreatedDate ? dateFormat(gameTransaction.dCreatedDate) : "Not Available"}
                                                </td> */}
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="pagination-section d-flex justify-content-between">
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        forcePage={firstPage === true && 0}
                                        containerClassName={"pagination justify-content-center"}
                                        pageClassName={"page-item"}
                                        pageLinkClassName={"page-link"}
                                        previousClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link"}
                                        breakClassName={"page-item"}
                                        breakLinkClassName={"page-link"}
                                        activeClassName={"active"}
                                    />
                                    <select
                                        value={pageSize}
                                        onChange={e => handlePageSize(e)}>
                                        {[10, 25, 40].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                Show {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="table-cnt table-cnt-box br-6">
                            <div className="table-responsive">
                                <table className="common-table table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Date & Time</th>
                                            <th className="text-center">D/C</th>
                                            <th className="text-center">Amount</th>
                                            <th className="text-center">Closing Balance</th>
                                            <th className="text-center">Type</th>
                                            <th className="text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                July 17, 2021, 04:09 PM
                                            </td>
                                            <td className="text-center clr-red">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                &#8377; 100
                                            </td>
                                            <td className="text-center">
                                                &#8377; 9850
                                            </td>
                                            <td className="text-center">
                                                tournamentBuyIn
                                            </td>
                                            <td className="text-center">
                                                Sucess
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                July 7, 2021, 05:05 PM
                                            </td>
                                            <td className="text-center clr-red">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                &#8377; 50
                                            </td>
                                            <td className="text-center">
                                                &#8377; 9809
                                            </td>
                                            <td className="text-center">
                                                joinTournament
                                            </td>
                                            <td className="text-center">
                                                Sucess
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                June 8, 2021, 11:27 AM
                                            </td>
                                            <td className="text-center clr-red">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                &#8377; 50
                                            </td>
                                            <td className="text-center">
                                                &#8377; 9859
                                            </td>
                                            <td className="text-center">
                                                tournamentBuyIn
                                            </td>
                                            <td className="text-center">
                                                Sucess
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                July 17, 2021, 04:09 PM
                                            </td>
                                            <td className="text-center clr-green">
                                                Credit
                                            </td>
                                            <td className="text-center">
                                                &#8377; 64
                                            </td>
                                            <td className="text-center">
                                                &#8377; 64
                                            </td>
                                            <td className="text-center">
                                                mttWinner
                                            </td>
                                            <td className="text-center">
                                                Sucess
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td colSpan="6" className="text-center">
                                                Not Available
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    );
}

export default connect()(GameTransaction);
