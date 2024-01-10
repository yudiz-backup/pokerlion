import { React, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { getTournamentTrasactions } from '../../../actions/tournamentTransactions'
import Loading from '../../../components/Loading'


function tournamentTransaction() {

    const [tournamentTransactions, setTournamentTransactions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [firstPage, setFirstPage] = useState(false);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const tournamentTrasactionsData = useSelector(state => state.tournamentTransactions.tournamentTransactionsData)

    useEffect(() => {
        document.title = "PokerLion | My Account"
    }, [])

    useEffect(() => {
        dispatch(getTournamentTrasactions(pageSize, currentPage, token))
        setLoading(true)
    }, [currentPage, pageSize])

    useEffect(() => {
        if (tournamentTrasactionsData?.transactions?.length) {
            setLoading(false)
            setTournamentTransactions(tournamentTrasactionsData?.transactions)
            setPageCount(Math.ceil(tournamentTrasactionsData?.count[0]?.totalData / pageSize));
            setTotalData(tournamentTrasactionsData?.count[0]?.totalData)
            setLoading(false)
        }
        else if (tournamentTrasactionsData) {
            setLoading(false)
        }
    }, [tournamentTrasactionsData])

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



    return (
        <>
            {loading && <Loading />}
            <div className="account-cnt">
                <div className="tournament-trans-section">
                    <h3 className="text-center account-title">Tournament Transactions</h3>
                    {tournamentTransactions?.length ?
                        <div className="table-cnt table-cnt-box br-6">
                            <div className="table-responsive">
                                <table className="common-table table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Tournament ID</th>
                                            <th className="text-center">Round</th>
                                            <th className="text-center">Position</th>
                                            <th className="text-center">Amount Debited</th>
                                            <th className="text-center">Amount Credited</th>
                                            <th className="text-center">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tournamentTransactions.map((tournamentTransaction, i) => (
                                            <tr key={i}>
                                                <td className="text-center">
                                                    {tournamentTransaction?._id || '0'}
                                                </td>
                                                <td className="text-center">
                                                    {tournamentTransaction?.nRound || '0'}
                                                </td>
                                                <td className="text-center">
                                                    {tournamentTransaction?.nPosition || '0'}
                                                </td>
                                                <td className="text-center">
                                                    &#8377; {tournamentTransaction?.nDebit?.toFixed(2) || '0'}
                                                </td>
                                                <td className="text-center">
                                                    &#8377;{tournamentTransaction?.nCredit?.toFixed(2) || '0'}
                                                </td>
                                                <td className="text-center">
                                                    {tournamentTransaction.dCreatedDate ? dateFormat(tournamentTransaction.dCreatedDate) : "Not Available"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* <button onClick={handleNext}>Next 10</button> */}

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
                        : <div className="table-cnt table-cnt-box br-6">
                            <div className="table-responsive">
                                <table className="common-table table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Tournament ID</th>
                                            <th className="text-center">Round</th>
                                            <th className="text-center">Position</th>
                                            <th className="text-center">Amount Debited</th>
                                            <th className="text-center">Amount Credited</th>
                                            <th className="text-center">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                Not Available
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                </div>
            </div>
        </>
    );
}

export default connect()(tournamentTransaction);
