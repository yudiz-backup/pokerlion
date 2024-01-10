/* eslint-disable react/prop-types */
import { React, useEffect, useState } from "react";
import Slider from "react-slick";
import { connect, useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { FacebookShareButton, FacebookIcon } from "react-share";

import { getReferralCode } from "../../../actions/invite";
import { getSettings } from "../../../actions/account";
import Loading from '../../../components/Loading'
import inviteFrnd from '../../../assets/images/invite-img.png';
import copy from '../../../assets/images/copy-icon.svg';
import mail from '../../../assets/images/mail.svg';
import facebook from '../../../assets/images/facebook.svg';
import social from '../../../assets/images/social-3.svg';

function InviteFriend() {

    const [referralCode, setReferralCode] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [sAvatar, setSAvatar] = useState('');
    const [sName, setSName] = useState('');
    const [sMessage, setSMessage] = useState('');
    const [sInviteMessage, setSInviteMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState('');


    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const referral = useSelector(state => state.invite.data)
    const gameSettings = useSelector(state => state.account.data)

    useEffect(() => {
        setLoading(true)
        dispatch(getReferralCode(token))
        dispatch(getSettings)
        document.title = "PokerLion | My Account"
    }, [])

    useEffect(() => {
        if (gameSettings) {
            setLoading(false)
            setSAvatar(gameSettings?.oInviteInfo?.oRewardedInfo?.sAvatar)
            setSName(gameSettings?.oInviteInfo?.oRewardedInfo?.sName)
            setSMessage(gameSettings?.oInviteInfo?.oRewardedInfo?.sMessage)
            setSInviteMessage(gameSettings?.oInviteInfo?.sMessage)
        }
    }, [gameSettings])

    useEffect(() => {
        if (referral) {
            setLoading(false)
            setReferralCode(referral.sReferralCode)
            setReferralLink(referral.sReferralLink)
            const link = referral?.sReferralLink?.match(/\bhttps?:\/\/\S+/gi);
            setLink(link[0])
        }
    }, [referral])

    const copyToClipboard = async (type) => {
        switch (type) {
            case "CODE":
                if (referralCode) {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(referralCode);
                    }
                    else {
                        let textArea = document.createElement("textarea");
                        textArea.value = referralCode;
                        textArea.style.position = "absolute";
                        textArea.style.opacity = 0;
                        document.body.appendChild(textArea);
                        // textArea.focus();
                        textArea.select();
                        await new Promise((res, rej) => {
                            document.execCommand('copy') ? res() : rej();
                            textArea.remove();
                        });
                    }
                    toast(
                        <div>
                            <div>Copied to clipboard!</div>
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
                break
            case "LINK":
                if (referralLink) {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(referralLink);
                    }
                    else {
                        let textArea = document.createElement("textarea");
                        textArea.value = referralLink;
                        textArea.style.position = "absolute";
                        textArea.style.opacity = 0;
                        document.body.appendChild(textArea);
                        // textArea.focus();
                        textArea.select();
                        await new Promise((res, rej) => {
                            document.execCommand('copy') ? res() : rej();
                            textArea.remove();
                        });
                    }
                    toast(
                        <div>
                            <div>Copied to clipboard!</div>
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
                break
        }
    }

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    function Mailto({ email, subject = '', body = '', children }) {
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

        return <a href={`mailto:${email}${params}`}>{children}</a>;
    }


    return (
        <>
            {loading && <Loading />}
            <div className="account-cnt">
                <div className="invite-friend-section">
                    <h3 className="text-center account-title">Invite Friend</h3>
                    <div className="invite-slider table-cnt-box br-6">
                        <Slider {...settings}>
                            <div>
                                <div className="invite-slide d-flex align-items-center">
                                    <div className="reviwer-img d-flex align-items-center justify-content-center">
                                        <img src={sAvatar} alt="reviwer" />
                                    </div>
                                    <div>
                                        <p>{sMessage}</p>
                                        <p>{sName}</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 offset-xxl-2 col-xxl-8">
                            <div className="how-invite table-cnt-box br-6 text-center">
                                <img src={inviteFrnd} alt="invite-friend" />
                                {/* <p className="gray-text">{sInviteMessage} </p> */}
                                <p className="gray-text">Why play alone? Invite your Friends and enjoy playing Poker! </p>
                                <div className="d-flex justify-content-center align-items-center share-referral">
                                    <p className="gray-text">Share Referral Code: <span>{referralCode}</span></p><button onClick={() => copyToClipboard("CODE")} className="small-text"><img src={copy} alt="copy-reffrel" />COPY CODE</button>
                                </div>
                                {/* <div className="text-center overflow-hidden"><div className="field-seprator mt-0"><p className="gray-text">OR</p></div></div>
                                <p className="gray-text">Share your link</p>
                                <div className="d-flex justify-content-center invite-social">
                                    <button className="p-0 border-0 bg-transparent"><Mailto email="" subject="Install" body={referralLink}><img src={mail} alt="mail" /></Mailto></button>
                                    <div className="google-btn">
                                        <img src={facebook} alt="facebook" />
                                        <FacebookShareButton url={link}>
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                    </div>
                                    <button className="p-0 border-0 bg-transparent" onClick={() => copyToClipboard("LINK")} ><img src={social} alt="social" /></button>
                                </div> */}
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
            </div>
        </>
    );
}

export default connect()(InviteFriend);
