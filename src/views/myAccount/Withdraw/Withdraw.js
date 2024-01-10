import { React, useEffect, useState, useRef } from 'react';
import bank from '../../../assets/images/bank.svg';
import amazonePay from '../../../assets/images/amazon-pay.svg';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getSettings } from '../../../actions/account';
import { withdraw } from '../../../actions/withdraw';
import Loading from '../../../components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import { verifyLength } from '../../../helper';
import { history } from '../../../App';

function Withdraw() {

    const [range, setRange] = useState({});
    const [withdrawBalance, setWithdrawBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitWithdrawDisable, setSubmitWithdrawDisable] = useState(false);

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const gameSettings = useSelector(state => state.account.data)
    const profileData = useSelector(state => state.account.dataProfile)
    const withdrawMessage = useSelector(state => state.withdraw.resMessage)
    const withdrawStatus = useSelector(state => state.withdraw.resStatus)

    const previousProps = useRef({ withdrawMessage }).current

    useEffect(() => {
        setLoading(true)
        dispatch(getSettings)
        document.title = "PokerLion | My Account"
    }, [])


    useEffect(() => {
        if (previousProps.withdrawMessage !== withdrawMessage) {
            if (withdrawMessage?.length) {
                toast(
                    <div>
                        <div>{withdrawMessage}</div>
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
            previousProps.withdrawMessage = withdrawMessage
        }
    }, [withdrawMessage])

    useEffect(() => {
        if (withdrawStatus === false) {
            setLoading(false)
            setAmount('')
            setSubmitWithdrawDisable(false)
        }
        if (withdrawStatus === true) {
            setLoading(false)
            setAmount('')
            setSubmitWithdrawDisable(false)
        }
    }, [withdrawStatus])

    function handleAmount(e) {
        setAmount(e.target.value)
        if (verifyLength(e.target.value, 1)) {
            setSubmitWithdrawDisable(true)
        } else if (!verifyLength(e.target.value, 1)) {
            setSubmitWithdrawDisable(false)
        }
    }

    function handleWithdraw(e) {
        setLoading(true)
        e.preventDefault()
        dispatch(withdraw(amount, token))
    }


    useEffect(() => {
        if (gameSettings) {
            setLoading(false)
            setRange(gameSettings?.oRedeem)
        }
    }, [gameSettings])

    useEffect(() => {
        if (profileData) {
            setWithdrawBalance(profileData?.nWithdrawable)
        }
    }, [profileData])

    function handleBankDetails() {
        history.push({ pathname: "/my-account", state: '3' })
    }

    return (
        <>
            {loading && <Loading />}
            <div className="account-cnt">
                <div className="withdraw-section">
                    <h3 className="text-center account-title">Withdraw</h3>
                    <div className="withdraw-container">
                        <ul className="m-0 p-0 list-unstyled d-flex justify-content-center withdraw-option">
                            <li className="d-flex align-items-center">
                                <input type="radio" name="withdraw" defaultChecked />
                                <span></span>
                                <img src={bank} alt="bank" />
                                <p>Bank</p>
                            </li>
                            <li className="d-flex align-items-center">
                                <input type="radio" name="withdraw" />
                                <span></span>
                                <div>
                                    <img src={amazonePay} alt="bank" />
                                    <p>gift card</p>
                                </div>
                            </li>
                        </ul>
                        <div className="table-cnt-box withdraw-box text-center">
                            <form>
                                <h6>Enter Amount to Withdraw</h6>
                                {/* <p className="gray-text range">Range (&#8377; {range?.nMinimum} to &#8377; {range?.nMaximum})</p> */}
                                <p className="gray-text range">Range (&#8377; 25 to &#8377; 25000)</p>
                                <p>Available Withdrawl Balance:  &#8377; {withdrawBalance?.toFixed(2)}  </p>
                                <div className="form-group">
                                    <input type="number" placeholder="₹ Enter Amount" onChange={(e) => handleAmount(e)} value={amount} />
                                </div>
                                <p className="gray-text">Charges = &#8377; 10 </p>
                                <div className="d-flex justify-content-center side-btn">
                                    <button className="common-btn yellow-btn small-btn" onClick={handleBankDetails}>BANK DETAILS</button>
                                    <button disabled={!submitWithdrawDisable} type="submit" className="common-btn yellow-btn small-btn" onClick={(e) => handleWithdraw(e)}>Withdraw</button>
                                </div>
                            </form>
                        </div>
                        {/* <div className="table-cnt-box withdraw-box text-center">
                            <form>
                                <h6>Enter Amount to Withdraw</h6>
                                <p className="gray-text range">Range (&#8377; 250 - &#8377; 5000)</p>
                                <p>Available Withdrawl Balance:  &#8377; 141.46  </p>
                                <div className="form-group">
                                    <input type="text" placeholder="₹ Enter Amount" />
                                </div>
                                <p className="gray-text">Charges - Free </p>
                                <div className="d-flex justify-content-center side-btn">
                                    <button type="submit" className="common-btn yellow-btn small-btn">BANK DETAILS</button>
                                    <button type="submit" className="common-btn yellow-btn small-btn">Withdraw</button>
                                </div>
                                <p className="text-center amazone-term">Amazone pay gift card <Link to="/" className="common-link">T&C</Link></p>
                            </form>
                        </div> */}
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
        </>
    );
}

export default connect()(Withdraw);
