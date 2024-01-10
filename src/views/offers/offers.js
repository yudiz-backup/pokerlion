import { React, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getOffers } from '../../actions/offers';
import Loading from '../../components/Loading';
import offerbanner1 from '../../assets/images/promo1.jpeg';
import offerbanner2 from '../../assets/images/promo2.jpeg';
import offerbanner3 from '../../assets/images/promo3.jpeg';
import offerbanner4 from '../../assets/images/promo4.jpeg';
import offerbanner5 from '../../assets/images/promo5.jpeg';

function offers() {

    const [offersList, setOffersList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [promoId, setPromoId] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [codeDescription, setCodeDescription] = useState('');

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const offersData = useSelector(state => state.offers.data)

    useEffect(() => {
        setLoading(true)
        dispatch(getOffers(token))
        document.title = 'PokerLion | Offers'
    }, [])

    useEffect(() => {
        if (offersData) {
            setLoading(false)
            setOffersList(offersData)
        }
    }, [offersData])

    function handleDescription(offer) {
        setShowMore(!showMore)
        setPromoId(offer?._id)
        setCodeDescription(offer?.oPromoCode?.sDescription)
    }

    return (
        <div>
            {loading && <Loading />}
            <div className="main-content half-padding offers-section">
                <div className="container">
                    <h3 className="text-center account-title">Offers</h3>
                    {/* <div className="row">
                        {!!offersList?.length && offersList.map((offer, i) => (
                            <div className="col-md-4 text-center" key={i}>
                                <img src={offer?.sIcon} alt="offer-banner" />
                                <p>Promo Code:<span className="fw-bold">{offer?.oPromoCode?.sCode || "NA"}</span></p>
                                <button type="button" className='common-btn small-btn' onClick={() => handleDescription(offer)}>View More</button>
                                <p className={promoId === offer?._id && showMore ? "" : "d-none"}>{codeDescription || 'NA'}</p>
                                {(promoId == offer?._id) && <p>{codeDescription || 'NA'}</p>}
                            </div>
                        ))
                        }
                        <div className="col-md-4 text-center">
                            <img src={offerBanner} alt="offer-banner" />
                            <p>Promo Code:<span className="fw-bold">ftd50</span></p>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src={offerbanner1} alt="offer-banner" />
                            <p>Promo Code:<span className="fw-bold">FTD50</span></p>
                            <button type="button" className='common-btn small-btn'>View More</button>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src={offerbanner2} alt="offer-banner" />
                            <p>Promo Code:<span className="fw-bold">SUPER100</span></p>
                            <button type="button" className='common-btn small-btn'>View More</button>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src={offerbanner3} alt="offer-banner" />
                            <p>Promo Code:<span className="fw-bold">GRAB5</span></p>
                            <button type="button" className='common-btn small-btn'>View More</button>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src={offerbanner4} alt="offer-banner" />
                            <p>Promo Code:<span className="fw-bold">GRAB10</span></p>
                            <button type="button" className='common-btn small-btn'>View More</button>
                        </div>
                        <div className="col-md-4 text-center">
                            <img src={offerbanner5} alt="offer-banner" />
                            <p>Promo Code:<span className="fw-bold">SUPER50</span></p>
                            <button type="button" className='common-btn small-btn'>View More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect()(offers);
