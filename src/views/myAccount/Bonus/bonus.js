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
                        <div className="total-bonus table-cnt-box d-flex br-6" style={{ "marginRight": "25px" }}>
                            <p>Total Available Bonus:</p><p> <b>&#8377; 0</b></p>
                        </div>
                        <div className="total-bonus table-cnt-box d-flex br-6">
                            <p>VIP Points:</p><p> <b>0</b></p>
                        </div>
                    </div>
                    <div className="bonus-dtl table-cnt-box br-6">
                        <div className="bonus-summary d-flex">
                            <div className="desposit-bonus d-flex justify-content-between align-items-center">
                                <p className="text-center">YOU WON<br /> DEPOSIT BONUS</p>
                                <p>&#8377; 5</p>
                            </div>
                            <div className="text-center used-bonus">
                                <div className="d-flex justify-content-center">
                                    <p className="gray-text">Used Bonus</p>
                                    <Button type="button" className="p-0 bg-transparent border-0">
                                        <img src={info} alt="info" />
                                    </Button>
                                </div>
                                <p className="fw-bold">&#8377; 1.75</p>
                            </div>
                            <div className="desposit-bonus d-flex justify-content-between align-items-center">
                                <p className="expire-bonus">EXPIRED BONUS: 3.25</p>
                            </div>
                        </div>
                        <div className='bonus-utiliz-blk'>
                            <h5 className="account-title">Bonus Utilization Details</h5>    
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
                                        <tr>
                                            <td className="text-center">
                                                &#8377; 0.25
                                            </td>
                                            <td className="text-center">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                July 17, 2021, 04:09 PM
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                &#8377; 0.25
                                            </td>
                                            <td className="text-center">
                                                Credit
                                            </td>
                                            <td className="text-center">
                                                July 7, 2021, 05:05 PM
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                &#8377; 0.25
                                            </td>
                                            <td className="text-center">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                June 8, 2021, 11:27 AM
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                &#8377; 0.50
                                            </td>
                                            <td className="text-center">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                June 7, 2021, 2:44 PM
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                &#8377; 1
                                            </td>
                                            <td className="text-center">
                                                Debit
                                            </td>
                                            <td className="text-center">
                                                June 6, 2021, 09:05 AM
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="data-not-found">
                                <h4 className="text-center">Data not found</h4>
                            </div> */}
                        </div>
                    </div>
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
