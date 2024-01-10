import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'reactstrap';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getSettings } from '../../actions/account';
import { toast, ToastContainer } from 'react-toastify';
import { depositCash, getPromocodeList } from '../../actions/deposit';
import Loading from '../../components/Loading';

function DepositCash() {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restrictedStates, setRestrictedStates] = useState([]);
    const [minAmount, setMinAmount] = useState(0);
    const [maxAmount, setMaxAmount] = useState(0);
    const [minDeposit, setMinDeposit] = useState(0);
    const [promocodeList, setPromocodeList] = useState([]);
    const [promoID, setPromoID] = useState('');
    const [swithToRemove, setSwithToRemove] = useState(false);
    const [promoArray, setPromoArray] = useState({});
    const [amount, setAmount] = useState('');
    const [disableDeposit, setDisableDeposit] = useState(false);

    const dispatch = useDispatch()
    const gameSettings = useSelector(state => state.account.data)
    const token = useSelector(state => state.auth.token)
    const promoList = useSelector(state => state.deposit.listData)
    const depositData = useSelector(state => state.deposit.depositData)
    const depositStatus = useSelector(state => state.deposit.resStatusDeposit)
    const depositMessage = useSelector(state => state.deposit.resMessageDeposit)
    const previousProps = useRef({ depositMessage }).current

    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        // dispatch(getPromocodeList(500, 1000, token))
        dispatch(getSettings)
        setAmount(null)
        setMinAmount(null)
        document.title = 'PokerLion | Deposit'
    }, [])

    useEffect(() => {
        if (previousProps.depositMessage !== depositMessage) {
            if (depositMessage?.length && depositMessage !== "success") {
                toast(
                    <div>
                        <div>{depositMessage}</div>
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
            previousProps.depositMessage = depositMessage
        }
    }, [depositMessage])

    useEffect(() => {
        if (gameSettings) {
            setRestrictedStates(gameSettings?.aRestrictedState)
            setMinAmount(gameSettings?.oPurchceRange?.nMinimum)
            setMaxAmount(gameSettings?.oPurchceRange?.nMaximum)
            setMinDeposit(gameSettings?.oPurchceRange?.nMinimum)
        }
    }, [gameSettings])


    useEffect(() => {
        if (depositData) {
            window.location.href = depositData?.paymentLink
        }
    }, [depositData])

    useEffect(() => {
        if (depositStatus === true) {
            setLoading(false)
        }
        if (depositStatus === false) {
            setLoading(false)
            setAmount('')
            setMinAmount(0)
            setDisableDeposit(false)
            setSwithToRemove(false)
        }
    }, [depositStatus])

    useEffect(() => {
        if (promoList) {
            setPromocodeList(promoList)
        }
    }, [promoList])

    function handleAmount(e) {
        setAmount(e.target.value)
        setMinAmount(e.target.value)
        if (e.target.value != 0) {
            setDisableDeposit(true)
        }
        else {
            setDisableDeposit(false)
        }
    }

    useEffect(() => {
        if (minAmount > 0) {
            const callSearchService = () => {
                dispatch(getPromocodeList(minAmount, maxAmount, token))
            }
            const debouncer = setTimeout(() => {
                callSearchService()
            }, 1000)
            return () => {
                clearTimeout(debouncer)
            }
        }
        if (minAmount === "" || minAmount === "0") {
            dispatch(getPromocodeList(1, maxAmount, token))
        }
    }, [minAmount])

    function handleApplyPromocode(promo) {
        setPromoArray(promo)
        setPromoID(promo?._id)
        setSwithToRemove(swithToRemove => !swithToRemove)
    }

    useEffect(() => {
        if (swithToRemove === false) {
            setPromoID('')
        }
    }, [swithToRemove])

    function handleDepositCash(e) {
        e.preventDefault()
        if (minAmount > 0) {
            setLoading(true)
            dispatch(depositCash(minAmount, promoID, token))
        }
    }


    return (
        <>
            {loading && <Loading />}
            <div className="main-content half-padding deposit-cash">
                <div className="container">
                    <h3 className="text-center account-title">Deposit</h3>
                    <div className="row">
                        <div className="offset-md-1 col-md-10 offset-lg-1 col-lg-10 offset-xxl-2 col-xxl-8">
                            <div className="table-cnt-box br-6">
                                <div className="text-center">
                                    {/* <p >Deposit Amount: <span className="fw-bold">&#8377;{minDeposit} - &#8377;{maxAmount}</span></p> */}
                                    <p >Deposit Amount: <span className="fw-bold">&#8377;20 - &#8377;50000</span></p>
                                </div>
                                <form onSubmit={handleDepositCash}>
                                    <div className="d-flex deposit-amount align-items-center">
                                        <div className="form-group mb-0">
                                            <input type="number" placeholder="₹ Enter Amount" value={amount} onChange={handleAmount} />
                                        </div>
                                        <div className="form-group m-0">
                                            <button type="submit" disabled={!disableDeposit} className="common-btn yellow-btn small-btn">ADD CASH</button>
                                        </div>
                                    </div>
                                    <Button color="primary" onClick={toggle} className="p-0 bg-transparent border-0 common-link">Apply Promocodes</Button>
                                    <Collapse isOpen={isOpen}>
                                        <div className="promocodes">

                                            <p className="medium-text">{promocodeList?.length ? "Promocodes" : "No Promocodes Found!"}</p>
                                            <ul className="m-0 list-unstyled">
                                                {
                                                    promocodeList?.map((promo, i) => (
                                                        <li className="d-flex align-items-center justify-content-between" key={i}>
                                                            <p className="medium-text promo-desc">{promo.sDescription?.length > 144 ? promo.sDescription.slice(0, 144) + '...' : promo.sDescription}</p>
                                                            <p className="medium-text fw-bold text-uppercase">{promo.sCode}</p>
                                                            <button type="button" onClick={() => handleApplyPromocode(promo)} className="common-btn yellow-btn small-btn"> {swithToRemove && promoArray?._id === promo?._id ? "remove" : "apply"}</button>
                                                        </li>
                                                    ))
                                                }
                                                {/* <li className="d-flex align-items-center justify-content-between">
                                                    <p className="medium-text">It’s Bonus Time! Join Rummy24 & get 50% upto ₹50.0 </p>
                                                    <p className="medium-text fw-bold text-uppercase">FTD50</p>
                                                    <button type="button" className="common-btn yellow-btn small-btn">apply</button>
                                                </li>
                                                */}
                                            </ul>
                                        </div>
                                    </Collapse>
                                    <ul className="p-0 list-unstyled suggest-amount d-flex flex-wrap">
                                        <li>
                                            <button type="button" > + &#8377; 50</button>
                                        </li>
                                        <li>
                                            <button type="button" > + &#8377; 100</button>
                                        </li>
                                        <li>
                                            <button type="button" > + &#8377; 150</button>
                                        </li>
                                        <li>
                                            <button type="button" > + &#8377; 200</button>
                                        </li>
                                        <li>
                                            <button type="button" > + &#8377; 500</button>
                                        </li>
                                    </ul>
                                    {/* <ul className="p-0 list-unstyled suggest-amount d-flex flex-wrap">
                                        <li>
                                            <button type="button" onClick={() => { setMinAmount(minDeposit); setAmount(minDeposit); setDisableDeposit(true) }} >&#8377; {minDeposit}</button>
                                        </li>
                                        <li>
                                            <button type="button" onClick={() => { setMinAmount(30); setAmount(30); setDisableDeposit(true) }} >&#8377; 30</button>
                                        </li>
                                        <li>
                                            <button type="button" onClick={() => { setMinAmount(60); setAmount(60); setDisableDeposit(true) }} >&#8377; 60</button>
                                        </li>
                                        <li>
                                            <button type="button" onClick={() => { setMinAmount(90); setAmount(90); setDisableDeposit(true) }} >&#8377; 90</button>
                                        </li>
                                        <li>
                                            <button type="button" onClick={() => { setMinAmount(maxAmount); setAmount(maxAmount); setDisableDeposit(true) }} >&#8377; {maxAmount}</button>
                                        </li>
                                    </ul> */}
                                </form>
                                {/* <p className="deposit-term gray-text">
                                    By depositing, you agree to our <a target="_blank" href="https://pokerlion.com/terms-condition.php" rel="noreferrer" className="common-link"> T&C</a> and <a target="_blank" href="https://pokerlion.com/privacy.php" rel="noreferrer" className="common-link">Privacy Policy</a>. We do not accept deposits from &nbsp;
                                    {restrictedStates?.map((state, i) =>
                                    (
                                        <span key={i}>
                                            {i === restrictedStates?.length - 1 ?
                                                <span>
                                                    <strong>{state}.</strong>
                                                </span> :
                                                <span>
                                                    <strong>{state}</strong>,&nbsp;
                                                </span>
                                            }
                                        </span>
                                    ))} */}
                                    {/* <strong>Assam</strong>, <strong>Odisha</strong>, <strong>Sikkim</strong>, <strong>Nagaland</strong>, <strong>Andhra Pradesh</strong>,<strong>Arunachal Pradesh</strong>, <strong>Telangana</strong>, <strong>Kerala</strong> & <strong>Tamilnadu</strong>.  */}
                                    {/* You must be 18+ to play real money Poker.
                                </p> */}
                                <p className="deposit-term gray-text">
                                    By depositing, you agree to our <a target="_blank" href="https://pokerlion.com/terms-condition.php" rel="noreferrer" className="common-link"> T&C</a> and <a target="_blank" href="https://pokerlion.com/privacy.php" rel="noreferrer" className="common-link">Privacy Policy</a>. We do not accept deposits from &nbsp;
                                    <strong>Andhra Pradehsh</strong>, <strong>Andaman and Nicobar</strong>, <strong>Arunachal Pradesh</strong>, <strong>Assam</strong>, <strong>Gujarat</strong>, <strong>Nagaland</strong>, <strong>Telangana &nbsp;</strong> 
                                    You must be 18+ to play real money Poker.
                                </p>
                            </div>
                        </div>
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

export default connect()(DepositCash);
