import { React, useState, useEffect } from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';
import moment from 'moment';
import { connect, useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import info from '../../../assets/images/info-icon.svg';
import { getBonus } from '../../../actions/bonus'
import Loading from '../../../components/Loading';

function Bonus() {

    const [pageCount, setPageCount] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [firstPage, setFirstPage] = useState(false);
    const [availableBonus, setAvailableBonus] = useState(0);
    const [bonuses, setBonuses] = useState([]);
    const [bonusTransactions, setBonusTransactions] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const bonusData = useSelector(state => state.bonus.data)

    useEffect(() => {
        document.title = "PokerLion | My Account"
    }, [])

    useEffect(() => {
        setLoading(true)
        dispatch(getBonus(pageSize, currentPage, token))
    }, [currentPage, pageSize])

    useEffect(() => {
        if (bonusData) {
            setLoading(false)
            setPageCount(Math.ceil((bonusData?.bonuses?.length) / pageSize));
            setTotalData(bonusData?.bonuses?.length)
            setBonuses(bonusData?.bonuses)
            for (let i = 0; i < bonusData?.bonusTotal?.length; i++) {
                if (bonusData?.bonusTotal[i]?.isExpired === false) {
                    setAvailableBonus(bonusData?.bonusTotal[i]?.nTotal - bonusData?.bonusTotal[i]?.nUsed)
                }
            }
        }
    }, [bonusData])

    function dateFormat(date) {
        return moment(date).format("MMM DD, yyyy, hh:mm A")
    }

    const handlePageClick = async (data) => {
        setCurrentPage(data.selected)
    }

    function handlebonusTransactions(data) {
        setBonusTransactions(data)
        setModal(!modal)
    }
    function handlePageSize(e) {
        if (Number(e.target.value) > 10) {
            setCurrentPage(0)
            setFirstPage(true)
        }
        setPageSize(Number(e.target.value))
        setPageCount(Math.ceil(totalData / e.target.value))
    }

    const toggleModal = () => setModal(!modal);

    return (
        <>
            {loading && <Loading />}
            <div className="account-cnt">
                <div className="bonus-section">
                    <h3 className="text-center account-title">Bonus</h3>
                    <div className="d-flex justify-content-center">
                        <div className="total-bonus table-cnt-box d-flex br-6">
                            <p>Total Available Bonus:</p><p> &#8377; {availableBonus}</p>
                        </div>
                    </div>
                    {!!bonuses?.length &&
                        <div className="bonus-dtl table-cnt-box br-6">
                            {bonuses.map((bonus, i) => (
                                <div className="bonus-summary d-flex" key={i}>
                                    <div className="desposit-bonus d-flex justify-content-between align-items-center">
                                        <p className="text-center">YOU WON<br /> DEPOSIT BONUS</p>
                                        <p>&#8377; {bonus.nBonus}</p>
                                    </div>
                                    <div className="text-center used-bonus">
                                        <div className="d-flex justify-content-center">
                                            <p className="gray-text">Used Bonus</p>
                                            <Button type="button" className="p-0 bg-transparent border-0" onClick={() => handlebonusTransactions(bonus.aTransaction)}>
                                                <img src={info} alt="info" />
                                            </Button>
                                        </div>
                                        <p className="fw-bold">&#8377; {bonus.nUsed}</p>
                                    </div>
                                    <div className="desposit-bonus d-flex justify-content-between align-items-center">
                                        {/* <p className="expire-bonus watch">EXPIRED BONUS {bonus.isExpired ? `: ${(bonus.nBonus - bonus.nUsed)}` : dateFormat(bonus.dExpiredAt)} </p> */}
                                        {bonus.isExpired ?
                                            <p className="expire-bonus">EXPIRED BONUS: {bonus.nBonus - bonus.nUsed}</p>
                                            :
                                            <p className="expire-bonus watch">EXPIRED BONUS {dateFormat(bonus.dExpiredAt)}</p>
                                        }
                                    </div>
                                </div>
                            ))}
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
                                    {[4, 10, 15].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            Show {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>}
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggleModal} className="msg-modal bg-white modal-with-header">
                <div className="modal-cnt">
                    <ModalHeader toggle={toggleModal}>Bonus Utilization Details</ModalHeader>
                    {bonusTransactions.length ?
                        <div className="table-responsive">
                            <table className="common-table table">
                                <thead>
                                    <tr>
                                        <th className="text-center">Amount</th>
                                        <th className="text-center">Transaction Type</th>
                                        <th className="text-center">Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bonusTransactions?.map((bonusT, i) => (
                                        <tr key={i}>
                                            <td className="text-center">
                                                &#8377; {bonusT.nAmount}
                                            </td>
                                            <td className="text-center">
                                                {bonusT.eType}
                                            </td>
                                            <td className="text-center">
                                                {bonusT.dCreatedDate ? dateFormat(bonusT.dCreatedDate) : "Not Available"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        : <div className="data-not-found">
                            <h4 className="text-center">Data not found</h4>
                        </div>}
                </div>
            </Modal>
        </>
    );
}


export default connect()(Bonus);
