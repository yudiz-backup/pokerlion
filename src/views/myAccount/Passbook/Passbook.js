import { React, useState, useEffect } from 'react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getPassbook } from '../../../actions/passbook'
import Loading from '../../../components/Loading'



function passbook() {


    const [passbook, setPassbook] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [firstPage, setFirstPage] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const passbookData = useSelector(state => state.passbook.passbookData)

    useEffect(() => {
        document.title = "PokerLion | My Account"
    }, [])

    useEffect(() => {
        setLoading(true)
        dispatch(getPassbook(pageSize, currentPage, token))
    }, [currentPage, pageSize])


    useEffect(() => {
        if (passbookData?.transactions?.length) {
            setPassbook(passbookData?.transactions)
            setPageCount(Math.ceil((passbookData?.count[0]?.totalData / 2) / pageSize));
            setTotalData(passbookData?.count[0]?.totalData / 2)
            setLoading(false)
        }
        else if (passbookData) {
            setLoading(false)
        }

    }, [passbookData])

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
                <div className="passbook-section">
                    <h3 className="text-center account-title">Passbook</h3>
                    {passbook?.length ?
                        <div className="table-cnt table-cnt-box br-6">
                            <div className="table-responsive">
                                <table className="common-table table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Reference ID</th>
                                            <th className="text-center">Transaction Amount</th>
                                            <th className="text-center">Transaction Type</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passbook.map((pass, i) => (
                                            <tr key={i} className="text-center">
                                                <td className="text-center">
                                                    {pass._id}
                                                </td>

                                                <td className="text-center">
                                                    &#8377;{pass.nAmount?.toFixed(2) || '0'}
                                                </td>
                                                <td className="text-center">
                                                    {pass.eType}
                                                </td>
                                                <td className="text-center">
                                                    {pass.eStatus}
                                                </td>
                                                <td>
                                                    {pass.dCreatedDate ? dateFormat(pass.dCreatedDate) : "Not Available"}
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
                        : <div className="table-cnt table-cnt-box br-6">
                            <div className="table-responsive">
                                <table className="common-table table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Tournament ID</th>
                                            <th className="text-center">Transaction Amount</th>
                                            <th className="text-center">Transaction Type</th>
                                            <th className="text-center">Status</th>
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

export default connect()(passbook);
