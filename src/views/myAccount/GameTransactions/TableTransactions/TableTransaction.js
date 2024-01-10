/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { connect, useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { getTableTrasactions } from '../../../../actions/gameTrasactions'
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading'
import BackArrow from '../../../../assets/images/table-left-arrow 2.png'

function TableTransaction(props) {

    const [tableTransactions, setTableTransactions] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [firstPage, setFirstPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const tableTrasactionsData = useSelector(state => state.gameTrasactions.tableTrasactionsData)

    useEffect(() => {
        const { match } = props
        dispatch(getTableTrasactions(pageSize, currentPage, match.params.id, token))
        setLoading(true)
    }, [currentPage, pageSize])

    useEffect(() => {
        document.title = "PokerLion | My Account"
    }, [])

    useEffect(() => {
        if (tableTrasactionsData?.transactions?.length !== undefined) {
            setTableTransactions(tableTrasactionsData?.transactions)
            setPageCount(Math.ceil(tableTrasactionsData?.count[0]?.totalData / pageSize));
            setTotalData(tableTrasactionsData?.count[0]?.totalData)
            setLoading(false)
        }
        else if (tableTrasactionsData) {
            setLoading(false)
        }
    }, [tableTrasactionsData])

    const handlePageClick = async (data) => {
        setCurrentPage(data.selected)
    }

    function dateFormat(date) {
        return moment(date).format("MMM DD yyyy hh:mm A")
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
                <div className="game-transaction-section">
                    <h3 className="text-center account-title">Table Transactions</h3>
                    <Link to='/game-transaction' className='common-btn back-btn small-btn back-btn'>
                        <img src={BackArrow} alt="Back-Arrow" />
                    </Link>
                    {tableTransactions ?
                        <div className="table-cnt table-cnt-box br-6">
                            <div className="table-responsive">
                                <table className="common-table table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Table ID</th>
                                            <th className="text-center">Transaction</th>
                                            <th className="text-center">Log Type</th>
                                            <th className="text-center">Type</th>
                                            <th className="text-center">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableTransactions.map((tableTransaction, i) => (
                                            <tr key={i}>
                                                <td className="text-center">
                                                    {tableTransaction.iTableId}
                                                </td>
                                                <td className="text-center">
                                                    &#8377; {`${tableTransaction.nAmount?.toFixed(2)} (${tableTransaction.sAction})`}
                                                </td>
                                                <td className="text-center">
                                                    {tableTransaction.eLogType}
                                                </td>
                                                <td className="text-center">
                                                    {(tableTransaction.nAmount > 0) ? 'Winning' : 'Loss'}
                                                </td>
                                                <td className="text-center">
                                                    {tableTransaction.dCreatedDate ? dateFormat(tableTransaction.dCreatedDate) : "Not Available"}
                                                </td>
                                            </tr>
                                        ))}
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
                        : <h3 className="text-center">Not Available</h3>}
                </div>
            </div>
        </>
    )
}


export default connect()(TableTransaction)
