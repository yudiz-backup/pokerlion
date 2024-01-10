/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment'
import Slider from "react-slick";
import { toast, ToastContainer } from 'react-toastify';
import { connect, useDispatch, useSelector } from 'react-redux'
import { Prompt, useLocation } from "react-router-dom";
import { useQueryState } from 'react-router-use-location-state'
import qs from 'query-string'
import Select from 'react-select'
import { addBank, getSettings, updateProfile, updateEmail, updateMobileNumber, getProfile, uploadKYC, verifyEmailRequest } from '../../../actions/account';
import { verifyLength, verifyEmail, verifyMobileNumber, verifyPincode, verifyIFSCcode, verifyPassword, verifyPAN } from '../../../helper';
import DatePicker from 'react-date-picker';
import { options } from '../../../assets/data/state'
import Loading from '../../../components/Loading'

import edit from '../../../assets/images/edit-profile-icon-white.svg';
import cross from '../../../assets/images/cross-white.png';
import Blackedit from '../../../assets/images/edit-profile-icon.svg'
import BlackCross from '../../../assets/images/cross.png';
import { getBonus } from '../../../actions/bonus';
import verify from '../../../assets/images/verify.png';
import refresh from '../../../assets/images/refresh.png';

function MyProfile(props) {

    const [activeTab, setActiveTab] = useState('1');
    const [avatar, setAvatar] = useState([])
    const [profile, setProfile] = useState({})
    const [username, setUsername] = useState('')
    const [DOB, setDOB] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [state, setState] = useState(null)
    const [pincode, setPincode] = useState('')
    const [editable, setEditable] = useState(false)
    const [withdrawableCash, setWithdrawableCash] = useState(0)
    const [currentAvatar, setCurrentAvatar] = useState(0)
    const [updatedAvatar, setUpdatedAvatar] = useState(0)
    const [value, setValue] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [isMobileVerified, setIsMobileVerified] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showArrows, setShowArrows] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [eyeIcon, setEyeIcon] = useState(false)
    const [password, setPassword] = useState('')
    const [PANNumber, setPANNumber] = useState('');
    const [KYCDocumentType, setKYCDocumentType] = useState('AdhaarCard');
    const [editKYC, setEditKYC] = useState(false);
    const [bankFormInput, setBankFormInput] = useState(false);
    const [disableBankSubmit, setDisableBankSubmit] = useState(false);
    const [disableKYC, setDisableKYC] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusKYC, setStatusKYC] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [disableInfoSubmit, setDisableInfoSubmit] = useState(false);
    const [emailUpdatePopup, setEmailUpdatePopup] = useState(false);
    const [totalCash, setTotalCash] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [slickPosition, setSlickPosition] = useState(0);
    const [passwordVerifyEmail, setPasswordVerifyEmail] = useState('');
    const [addressStatus, setAddressStatus] = useState('');
    const [updateEmailDisable, setUpdateEmailDisable] = useState(false);
    const [oldEmail, setOldEmail] = useState('');
    const [activeProfileTab, setActiveProfiletab] = useQueryState('myProfile', '1')

    const [bankName, setBankName] = useState('')
    const [IFSCCode, setIFSCCode] = useState('')
    const [holderName, setHolderName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('')

    const [PANImage, setPANImage] = useState(null);
    const [PANInputDisable, setPANInputDisable] = useState(false);
    const [KYCFrontImage, setKYCFrontImage] = useState(null);
    const [KYCFrontInputDisable, setKYCFrontInputDisable] = useState(false);
    const [KYCBackImage, setKYCBackImage] = useState(null);
    const [KYCBackInputDisable, setKYCBackInputDisable] = useState(false);

    const [errUsername, setErrUsername] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errMobileNumber, setErrMobileNumber] = useState('')
    const [errPincode, setErrPincode] = useState('')
    const [errBankName, setErrBankName] = useState('')
    const [errIFSCCode, setErrIFSCCode] = useState('')
    const [errHolderName, setErrHolderName] = useState('')
    const [errAccountNumber, setErrAccountNumber] = useState('')
    const [errConfirmAccountNumber, setErrConfirmAccountNumber] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const [errPANNumber, setErrPANNumber] = useState('');
    const [errPANImg, setErrPANImg] = useState('');
    const [errKYCFrontImg, setErrKYCFrontImg] = useState('');
    const [errKYCBackImg, setErrKYCBackImg] = useState('');


    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const resMessage = useSelector(state => state.account.resMessage)
    const avatarData = useSelector(state => state.account.data)
    const profileData = useSelector(state => state.account.dataProfile)
    const bankStatus = useSelector(state => state.account.resStatusBank)
    const KYCStatus = useSelector(state => state.account.resStatusKYC)
    const bonusData = useSelector(state => state.bonus.data)
    const updateEmailStatus = useSelector(state => state.account.resStatusUpdateEmail)
    const verifyEmailStatus = useSelector(state => state.account.resStatusVerifyEmail)

    const previousProps = useRef({ avatarData, profileData }).current
    const sliderRef = useRef();
    const location = useLocation();

    useEffect(() => {
        dispatch(getSettings)
        dispatch(getBonus(10, 0, token))
        setLoading(true)
        if (location?.state) {
            setActiveTab(location.state)
        }
        document.title = "PokerLion | My Account"

        const obj = qs.parse(location.search)
        obj?.myProfile && setActiveTab(obj.myProfile)
    }, [])


    useEffect(() => {
        if (resMessage?.length && resMessage !== 'Invalid credentials') {
            dispatch(getSettings)
            dispatch(getProfile(token))
            sliderRef.current.slickGoTo(0)
            setShowEdit(false)
            setEditable(false)
            setShowArrows(false)
            setShowSubmit(false)
            setLoading(false)
            toast(
                <div>
                    <div>{resMessage}</div>
                </div>
            );
        }
        if (resMessage?.length && resMessage == 'Invalid credentials') {
            dispatch(getSettings)
            dispatch(getProfile(token))
            toast(
                <div>
                    <div>{resMessage}</div>
                </div>
            );
        }
    }, [resMessage])

    useEffect(() => {
        if (bankStatus === false) {
            setBankName('')
            setIFSCCode('')
            setHolderName('')
            setAccountNumber('')
            setConfirmAccountNumber('')
        }
    }, [bankStatus])


    useEffect(() => {
        if (avatarData) {
            setLoading(false)
            // setAvatar(avatarData?.aAvatar?.slice(-10))
            if (profileData?.sAvatar) {
                // const currentUserAvatar = profileData?.sAvatar
                // const newAvatarArray = [currentUserAvatar].concat(avatarData?.aAvatar?.slice(-10))
                // setAvatar(newAvatarArray)

                const avatarArray = avatarData?.aAvatar?.slice(-10)
                const currentAvatar = profileData?.sAvatar
                let newAvatarArray = []

                if (!avatarArray.includes(currentAvatar)) {
                    newAvatarArray = [currentAvatar].concat(avatarArray)
                } else {
                    avatarArray.splice(avatarArray.indexOf(currentAvatar), 1);
                    newAvatarArray = [currentAvatar].concat(avatarArray)
                }
                setAvatar(newAvatarArray)
            }
        }
    }, [avatarData, profileData])

    useEffect(() => {
        if (previousProps.profileData !== profileData) {
            setProfile(profileData)
        }
        return () => {
            previousProps.profileData = profileData
        }
    }, [profileData])


    useEffect(() => {
        if (profile) {
            setUsername(profile?.sUserName || 'Not available')
            setDOB(profile?.dDob || 'Not available')
            setEmail(profile?.sEmail || 'Not available')
            setMobileNumber(profile?.sMobile?.substring(3) || 'Not available')
            setState(profile?.oAddress?.sState || 'Not available')
            setPincode(profile?.oAddress?.sPinCode || 'Not available')
            setWithdrawableCash(profile?.nWithdrawable?.toFixed(2) || 0)
            setCurrentAvatar(profile?.sAvatar || '')
            setUpdatedAvatar(profile?.sAvatar || '')
            setIsEmailVerified(profile?.isEmailVerified || false)
            setIsMobileVerified(profile?.isMobileVerified || false)
            setValue(moment(profile?.dDob).toDate())
            setPANNumber(profile?.oKYC?.sPanNumber || '')
            setPANImage(profile?.oKYC?.sPanCardLink || null)
            setKYCDocumentType(profile?.oKYC?.sDocumentName || 'AdhaarCard')
            setKYCFrontImage(profile?.oKYC?.aDocuments[0] || null)
            setKYCBackImage(profile?.oKYC?.aDocuments[1] || null)
            setBankName(profile?.oBanking?.sBankName || '')
            setIFSCCode(profile?.oBanking?.sIFSC || '')
            setHolderName(profile?.oBanking?.sAccountHolderName || '')
            setAccountNumber(profile?.oBanking?.sAccountNo || '')
            setConfirmAccountNumber(profile?.oBanking?.sAccountNo || '')
            setStatusKYC(profile?.oKYC?.eState || '')
            setTotalCash(profile?.nChips?.toFixed(2) || 0)
            setAddressStatus(profile?.oAddress?.eState)
            setOldEmail(profile?.sEmail)
            if (profile?.oKYC?.eState === 'rejected') {
                setRejectReason(profile?.oKYC?.sRejectReason)
            }
            if (profile?.oBanking?.sBankName && profile?.oBanking?.sAccountNo) {
                setBankFormInput(true)
            }
        }
    }, [profile])

    useEffect(() => {
        if (bonusData) {
            setBonus(bonusData?.bonusTotal[0]?.nTotal - bonusData?.bonusTotal[0]?.nUsed || 0)
        }
    }, [bonusData])

    useEffect(() => {
        if (KYCStatus === true) {
            setLoading(false)
            setEditKYC(false)
        }
        if (KYCStatus === false) {
            setLoading(false)
            setEditKYC(false)
        }
    }, [KYCStatus])

    useEffect(() => {
        if (updateEmailStatus === true) {
            setLoading(false)
            setEmailUpdatePopup(false)
            setEyeIcon(false)
            setPasswordVerifyEmail('')
        }
        if (updateEmailStatus === false) {
            setLoading(false)
            setPasswordVerifyEmail('')
            setEyeIcon(false)
            setUpdateEmailDisable(false)
        }
    }, [updateEmailStatus])

    useEffect(() => {
        if (verifyEmailStatus === true) {
            setLoading(false)
        }
        if (verifyEmailStatus === false) {
            setLoading(false)
        }
    }, [verifyEmailStatus])


    useEffect(() => {
        if (PANImage) {
            setPANInputDisable(true)
        }
    }, [PANImage])

    useEffect(() => {
        if (KYCFrontImage) {
            setKYCFrontInputDisable(true)
        }
    }, [KYCFrontImage])

    useEffect(() => {
        if (KYCBackImage) {
            setKYCBackInputDisable(true)
        }
    }, [KYCBackImage])

    useEffect(() => {
        if (errPANNumber?.length) {
            setDisableKYC(false)
        } else {
            if (PANNumber?.length === 0) {
                setDisableKYC(false)
            } else {
                if (PANImage === null || KYCFrontImage === null || KYCBackImage === null) {
                    setDisableKYC(false)
                }
                else {
                    setDisableKYC(true)
                }
            }
        }
    }, [errPANNumber])

    useEffect(() => {
        if (PANImage === null || KYCFrontImage === null || KYCBackImage === null || !PANNumber || errPANNumber) {
            setDisableKYC(false)
        } else {
            setDisableKYC(true)
        }
    }, [PANImage, KYCFrontImage, KYCBackImage])

    useEffect(() => {
        if (showEdit == true) {
            window.onbeforeunload = function () {
                return true;
            };
        }
        return () => {
            window.onbeforeunload = null;
        };
    }, [showEdit]);

    useEffect(() => {
        if (email?.length && passwordVerifyEmail?.length && !errPassword && !errEmail && email != oldEmail) {
            setUpdateEmailDisable(true)
        } else {
            setUpdateEmailDisable(false)
        }

    }, [email, passwordVerifyEmail])



    const handleChangeDate = (date) => {
        setValue(date)
        // setDisableInfoSubmit(true)
        if (moment(date).format('MM/DD/YYYY') === profile?.dDob) {
            setDisableInfoSubmit(false)
        } else {
            setDisableInfoSubmit(true)
        }
    }

    function handleEdit() {
        setShowEdit(true)
        setEditable(true)
        setShowArrows(true)
        setShowSubmit(true)
        setDisableInfoSubmit(false)
    }
    function handleCross() {
        setShowEdit(false)
        setEditable(false)
        setShowArrows(false)
        setShowSubmit(false)
        setUsername(profile?.sUserName || 'Not available')
        setDOB(profile?.dDob || 'Not available')
        setEmail(profile?.sEmail || 'Not available')
        setMobileNumber(profile?.sMobile?.substring(3) || 'Not available')
        setState(profile?.oAddress?.sState || 'Not available')
        setPincode(profile?.oAddress?.sPinCode || 'Not available')
        setWithdrawableCash(profile?.nWithdrawable?.toFixed(2) || 0)
        setCurrentAvatar(profile?.sAvatar || '')
        setUpdatedAvatar(profile?.sAvatar || '')
        setValue(profile?.dDob ? moment(profile?.dDob).toDate() : '')
        sliderRef.current.slickGoTo(0);
        setPassword('')
        setErrPassword('')
        setErrUsername('')
        setErrEmail('')
        setErrMobileNumber('')
        setErrPincode('')
        setDisableInfoSubmit(false)
    }

    function handleEditKYC(e) {
        e.preventDefault()
        setEditKYC(true)
    }
    function handleHideKYC(e) {
        e.preventDefault()
        setEditKYC(false)
        setPANNumber(profile?.oKYC?.sPanNumber || '')
        setPANImage(profile?.oKYC?.sPanCardLink || null)
        setKYCDocumentType(profile?.oKYC?.sDocumentName || 'AdhaarCard')
        setKYCFrontImage(profile?.oKYC?.aDocuments[0] || null)
        setKYCBackImage(profile?.oKYC?.aDocuments[1] || null)
        setErrPANNumber('')
        setErrPANImg('')
        setErrKYCFrontImg('')
        setErrKYCBackImg('')
    }

    function handleChange(event, type) {
        const re = /^[A-Za-z]+$/
        switch (type) {
            case 'Username':
                if (verifyLength(event.target.value, 1)) {
                    setErrUsername('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrUsername('Username should not be empty')
                }
                if (event.target.value === profile?.sUserName) {
                    setDisableInfoSubmit(false)
                } else {
                    setDisableInfoSubmit(true)
                }
                setUsername(event.target.value)
                break
            case 'Email':
                if (verifyLength(event.target.value, 1) && verifyEmail(event.target.value)) {
                    setErrEmail('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrEmail('Please enter your Email')
                } else {
                    setErrEmail('Please enter valid Email')
                }
                setEmail(event.target.value)
                break
            case 'MobileNumber':
                if (verifyLength(event.target.value, 1) && verifyMobileNumber(event.target.value)) {
                    setErrMobileNumber('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrMobileNumber('Please enter Mobile Number')
                } else {
                    setErrMobileNumber('Please enter valid Mobile Number')
                }
                setMobileNumber(event.target.value)
                setDisableInfoSubmit(true)
                break
            case 'Pincode':
                if (verifyPincode(event.target.value)) {
                    setErrPincode('')
                } else if (!verifyPincode(event.target.value)) {
                    setErrPincode('enter valid pincode')
                } else {
                    setErrPincode('please enter valid pincode')
                }
                if (event.target.value === profile?.oAddress?.sPinCode) {
                    setDisableInfoSubmit(false)
                } else {
                    setDisableInfoSubmit(true)
                }
                setPincode(event.target.value)
                break
            case 'BankName':
                if (verifyLength(event.target.value, 1)) {
                    setErrBankName('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrBankName('Please enter the bank name')
                }
                if (event.target.value === "" || re.test(event.target.value)) {
                    setBankName(event.target.value)
                }
                setDisableBankSubmit(true)
                break
            case 'IFSC':
                if (verifyIFSCcode(event.target.value)) {
                    setErrIFSCCode('')
                } else if (!verifyIFSCcode(event.target.value)) {
                    setErrIFSCCode('Please enter the valid IFSC code')
                } else {
                    setErrIFSCCode('Please enter the IFSC code')
                }
                setIFSCCode(event.target.value.toUpperCase())
                setDisableBankSubmit(true)
                break
            case 'HolderName':
                if (verifyLength(event.target.value, 1)) {
                    setErrHolderName('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrHolderName("Please enter the bank account holder's name")
                }
                if (event.target.value === "" || re.test(event.target.value)) {
                    setHolderName(event.target.value)
                }
                setDisableBankSubmit(true)
                break
            case 'AccountNumber':
                if (verifyLength(event.target.value, 1)) {
                    setErrAccountNumber('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrAccountNumber('Please enter your bank account number')
                }
                if (event.target.value == confirmAccountNumber) {
                    setErrConfirmAccountNumber('')
                }
                setAccountNumber(event.target.value)
                setDisableBankSubmit(true)
                break
            case 'ConfimAccountNumber':
                if (verifyLength(event.target.value, 1) && accountNumber == event.target.value) {
                    setErrConfirmAccountNumber('')
                }
                else if (accountNumber != event.target.value) {
                    setErrConfirmAccountNumber("Account Number don't match")
                }
                setConfirmAccountNumber(event.target.value)
                setDisableBankSubmit(true)
                break
            case 'Password':
                if (verifyPassword(event.target.value)) {
                    setErrPassword('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrPassword('Required field')
                }
                else {
                    setErrPassword('Must contain minimum 6 characters')
                }
                setPassword(event.target.value)
                break
            case 'PANNumber':
                if (verifyLength(event.target.value.toUpperCase(), 1) && verifyPAN(event.target.value.toUpperCase())) {
                    setErrPANNumber('')
                } else if (!verifyLength(event.target.value.toUpperCase(), 1)) {
                    setErrPANNumber('Please enter PAN number')
                } else {
                    setErrPANNumber('Invalid PAN Number')
                }
                setPANNumber(event.target.value.toUpperCase())
                break
            case 'Document':
                setKYCDocumentType(event.target.value)
                break
            case 'PANImage':
                if (event?.target?.files && event.target.files[0]?.size < 1017241) {
                    setPANImage(event.target.files[0]);
                    setErrPANImg('')
                } else {
                    setErrPANImg('Image size must be less than 1 MB')
                }
                break
            case 'KYCFrontImage':
                if (event?.target?.files && event.target.files[0]?.size < 1017241) {
                    setKYCFrontImage(event.target.files[0]);
                    setErrKYCFrontImg('')
                } else {
                    setErrKYCFrontImg('Image size must be less than 1 MB')
                }
                break
            case 'KYCBackImage':
                if (event?.target?.files && event.target.files[0]?.size < 1017241) {
                    setKYCBackImage(event.target.files[0]);
                    setErrKYCBackImg('')
                } else {
                    setErrKYCBackImg('Image size must be less than 1 MB')
                }
                break
            case 'EmailVerifyPassword':
                if (verifyPassword(event.target.value)) {
                    setErrPassword('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrPassword('Required field')
                }
                else {
                    setErrPassword('Must contain minimum 6 characters')
                }
                setPasswordVerifyEmail(event.target.value)
                break
            default:
                break
        }
    }


    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    function handleState(e) {
        setState(e.value)
        if (e.value === profile?.oAddress?.sState) {
            setDisableInfoSubmit(false)
        } else {
            setDisableInfoSubmit(true)
        }
    }

    function handlePasswordVisibility(e) {
        e.preventDefault()
        setEyeIcon(eyeIcon => !eyeIcon)
        setPasswordVisibility(passwordVisibility => !passwordVisibility)
    }

    function handleRemovePANImage(e) {
        e.preventDefault()
        setPANImage(null)
        setPANInputDisable(false)
    }

    function handleRemoveKYCFrontImage(e) {
        e.preventDefault()
        setKYCFrontImage(null)
        setKYCFrontInputDisable(false)
    }

    function handleRemoveKYCBackImage(e) {
        e.preventDefault()
        setKYCBackImage(null)
        setKYCBackInputDisable(false)
    }

    function handleEmailUpdate(e) {
        e.preventDefault()
        setLoading(true)
        dispatch(updateEmail(email, passwordVerifyEmail, token))
    }

    function handleEmailVerify(e) {
        e.preventDefault()
        setLoading(true)
        dispatch(verifyEmailRequest(email))
    }

    function handleEditSubmit(e) {
        e.preventDefault()
        const date = (dateOfBirth) => { return (moment(dateOfBirth).format('MM-DD-YYYY')) }
        if (currentAvatar != updatedAvatar) {
            dispatch(updateProfile({ sAvatar: updatedAvatar, token }))
            setLoading(true)
        }
        if (profile?.sUserName != username) {
            dispatch(updateProfile({ sUserName: username, token }))
            setLoading(true)
        }
        if (profile?.sMobile.substring(3) != mobileNumber) {
            dispatch(updateMobileNumber(mobileNumber, token))
            setLoading(true)
        }
        if (date(DOB) != date(value)) {
            dispatch(updateProfile({ dDob: date(value), token }))
            setLoading(true)
        }
        if ((profile?.oAddress?.sState != state || profile?.oAddress?.sPinCode != pincode) && !errPincode) {
            dispatch(updateProfile({ sState: state, sPinCode: pincode, token }))
            setLoading(true)
        }
    }


    function handleBankDetails(e) {
        e.preventDefault()
        if (bankName?.length && IFSCCode.length && holderName?.length && accountNumber?.length && confirmAccountNumber?.length && !errBankName && !errIFSCCode && !errHolderName && !errAccountNumber && !errConfirmAccountNumber) {
            dispatch(addBank(accountNumber, IFSCCode, holderName, token))
            setLoading(true)
        } else {
            if (!verifyLength(bankName, 1)) {
                setErrBankName('Please enter the bank name')
            }
            if (!verifyLength(IFSCCode, 1)) {
                setErrIFSCCode("Please enter your bank's IFSC code")
            }
            if (!verifyLength(holderName, 1)) {
                setErrHolderName("Please enter the bank account holder's name")
            }
            if (!verifyLength(accountNumber, 1)) {
                setErrAccountNumber('Please enter your bank account number')
            }
            if (!verifyLength(confirmAccountNumber, 1)) {
                setErrConfirmAccountNumber('Please re-enter your bank account number')
            }
        }
    }

    async function handleKYCSubmit(e) {
        e.preventDefault()
        const formdata = new FormData()

        if (typeof PANImage === 'string') {
            let PANblob = await fetch(PANImage).then(r => r.blob()).catch(error => console.log(error))
            formdata.append('sPancard', PANblob)
        } else {
            formdata.append('sPancard', PANImage)
        }

        if (typeof KYCFrontImage === 'string') {
            let KYCFrontblob = await fetch(KYCFrontImage).then(r => r.blob()).catch(error => console.log(error))
            formdata.append('aDocuments', KYCFrontblob)
        } else {
            formdata.append('aDocuments', KYCFrontImage)
        }

        if (typeof KYCBackImage === 'string') {
            let KYCBackblob = await fetch(KYCBackImage).then(r => r.blob()).catch(error => console.log(error))
            formdata.append('aDocuments', KYCBackblob)
        } else {
            formdata.append('aDocuments', KYCBackImage)
        }

        formdata.append('sPanNumber', PANNumber)
        formdata.append('sDocumentName', KYCDocumentType)
        dispatch(uploadKYC(formdata, token))
        setLoading(true)
    }



    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "30px",
        slidesToShow: 7,
        speed: 500,
        swipe: false,
        arrows: showArrows ? true : false,
        afterChange: current => avatar ?
            (setUpdatedAvatar(avatar[current]), setSlickPosition(current), currentAvatar === avatar[current] ? setDisableInfoSubmit(false) : setDisableInfoSubmit(true)) : '',
        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    centerPadding: "0px",
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1399,
                settings: {
                    centerPadding: "0px",
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    centerPadding: "0px",
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
        ]
    };


    return (
        <>
            {loading && <Loading />}
            <div className="account-cnt">
                <div className="my-profile">
                    <h3 className="text-center account-title">My Profile</h3>
                    <div className="point-table">
                        <div className="table-cnt p-0">
                            <Nav tabs className="justify-content-center">
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); setActiveProfiletab('1') }}>BASIC INFO
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); setActiveProfiletab('2') }}>KYC
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); setActiveProfiletab('3') }}>BANK ACCOUNT
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="avtar-section text-center table-cnt-box">
                                        <p>User Avatar</p>
                                        <Slider {...settings} ref={sliderRef}>
                                            {
                                                avatar?.length ? avatar.map((userAvatar, i) => (
                                                    <div key={i}>
                                                        <div className="avtar-container">
                                                            <div className="avtar-round">
                                                                <img src={userAvatar} alt="avtar" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : null
                                            }
                                        </Slider>
                                    </div>
                                    <div className="balance-section">
                                        <div className="row">
                                            <div className="offset-lg-1 col-lg-10 offset-xl-1 col-xl-10 offset-xxl-2 col-xxl-8">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div>
                                                            <p className="medium-text">Total Cash</p>
                                                            <h3>&#8377; {totalCash}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div>
                                                            <p className="medium-text">Withdrawable Cash</p>
                                                            <h3>&#8377; {withdrawableCash}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div>
                                                            <p className="medium-text">VIP Points</p>
                                                            <h3>0</h3>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div>
                                                            <p className="medium-text">Bonus Balance</p>
                                                            <h3>&#8377; {bonus}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-dtl table-cnt-box position-relative">
                                        <div className="row">
                                            <div className="offset-md-1 col-md-10">
                                                <div className="row">
                                                    <div className="col-lg-4 col-xl-4 col-xxl-3">
                                                        <p className="medium">Player Name</p>
                                                        <input type="text" value={username} className={editable ? "editable" : ""} disabled={!editable} onChange={(e) => handleChange(e, "Username")} />
                                                        <p className="error-text" >{errUsername}</p>
                                                    </div>
                                                    <div className="col-lg-4 col-xl-4 col-xxl-3">
                                                        <p className="medium">DOB</p>
                                                        <DatePicker
                                                            onChange={handleChangeDate}
                                                            value={value}
                                                            disabled={!editable}
                                                            calendarIcon={null}
                                                            clearIcon={null}
                                                            className="datePicker"
                                                        />
                                                    </div>
                                                    <div className="col-lg-4 col-xl-4 col-xxl-3">
                                                        <div className={isEmailVerified ? "verified-input verified" : "verified-input"}>
                                                            <p className="medium">Email</p>
                                                            <input type="email" disabled={isEmailVerified} value={email} readOnly />
                                                            <div className="verify-btn-list">
                                                                <button type="button" onClick={() => { setEmailUpdatePopup(true); setPasswordVerifyEmail('') }} className={isEmailVerified ? "d-none" : editable ? "verify-btn" : "d-none"}><img src={refresh} alt="refresh" /></button>
                                                                <button type="button" onClick={handleEmailVerify} className={isEmailVerified ? "d-none" : editable ? "verify-btn" : "d-none"}><img src={verify} alt="verify" /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-xl-4 col-xxl-3">
                                                        <div className={isMobileVerified ? "verified-input verified" : "verified-input"}>
                                                            <p className="medium">Phone Number</p>
                                                            <input type="text" value={mobileNumber} className={editable && !isMobileVerified ? "editable" : ""} disabled={isMobileVerified} onChange={(e) => handleChange(e, "MobileNumber")} />
                                                            <p className="error-text" >{errMobileNumber}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4 col-xl-4 col-xxl-3">
                                                        <p className="medium">State</p>
                                                        <Select
                                                            isDisabled={!editable}
                                                            options={options}
                                                            defaultValue={{
                                                                label:
                                                                    options.filter(function (option) {
                                                                        return option.label === state
                                                                    })
                                                            }}
                                                            onChange={(e) => handleState(e)}
                                                            value={options.filter(function (option) {
                                                                return option.value === state;
                                                            })}

                                                        />
                                                        <p></p>
                                                    </div>
                                                    <div className="col-lg-4 col-xl-4 col-xxl-3">
                                                        <p className="medium">Pincode</p>
                                                        <input type="text" maxLength="6" value={pincode} className={editable ? "editable" : ""} disabled={!editable} onChange={(e) => handleChange(e, "Pincode")} />
                                                        <p className="error-text">{errPincode}</p>
                                                    </div>
                                                    {/* {addressStatus && <p>Address Verification Status: <span className='text-capitalize'>{addressStatus}</span></p>}
                                                    {addressStatus === "rejected" && <p>Reason: - </p>} */}
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={handleEdit} className={!showEdit ? "border-0 bg-transparent edit-profile-btn" : "d-none"}>
                                            <img src={Blackedit} alt="edit" />
                                        </button>
                                    </div>
                                    <div className={showSubmit ? "text-center side-btn" : "d-none"}>
                                        <button disabled={!disableInfoSubmit} className="common-btn yellow-btn" onClick={handleEditSubmit}>
                                            Submit
                                        </button>
                                        <button className="common-btn yellow-btn" onClick={handleCross}>
                                            Cancel
                                        </button>
                                    </div>
                                    <div className={emailUpdatePopup ? "edit-auth-dtl edit-verify-popup active" : 'd-none'}>
                                        <div>
                                            <h3 className="white-text"><strong>Update Your Email</strong></h3>
                                            <form>
                                                <div className="form-group">
                                                    <input type="email" placeholder="Enter your new email" value={email} onChange={(e) => handleChange(e, "Email")} />
                                                </div>
                                                <div className="form-group pass-field">
                                                    <input type={passwordVisibility ? "text" : "password"} placeholder="Enter your password" value={passwordVerifyEmail} onChange={(e) => handleChange(e, "EmailVerifyPassword")} />
                                                    <p className="error-text" >{errPassword}</p>
                                                    <button className={eyeIcon ? "pass hide border-0 bg-transparent" : "pass border-0 bg-transparent"} onClick={handlePasswordVisibility}></button>
                                                </div>
                                            </form>
                                            <div className="d-flex side-btn justify-content-center">
                                                <input disabled={!updateEmailDisable} type="button" onClick={handleEmailUpdate} className="common-btn yellow-btn small-btn" value="Update" />
                                                <input type="button" onClick={() => { setEmailUpdatePopup(false); setEmail(oldEmail) }} className="common-btn yellow-btn small-btn m-0" value="Cancel" />
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="kyc-detail">
                                        <div className="row">
                                            <div className="offset-md-1 col-md-10 offset-lg-1 col-lg-10 offset-xxl-2 col-xxl-8">
                                                <form onSubmit={handleKYCSubmit}>
                                                    <div className="kyc-box">
                                                        <div className="kyc-header d-flex align-items-center justify-content-between">
                                                            <h6 className="white-text">PAN Card</h6>
                                                            <button onClick={handleEditKYC} className={(!editKYC && statusKYC !== 'approved') ? "border-0 bg-transparent edit-profile-btn" : "d-none"}>
                                                                <img src={edit} alt="edit" />
                                                            </button>
                                                            <button onClick={handleHideKYC} className={editKYC ? "border-0 bg-transparent edit-profile-btn" : "d-none"}>
                                                                <img src={cross} alt="remove" />
                                                            </button>
                                                        </div>
                                                        <div className="table-cnt-box kyc-body">
                                                            <div className="row align-items-center">
                                                                <div className="col-md-6 col-lg-6 col-xxl-7">
                                                                    <div className="form-group">
                                                                        <label className="label">Enter PAN Number</label>
                                                                        <input type="text" style={{ "textTransform": "uppercase" }} maxLength="10" value={PANNumber} onChange={(e) => handleChange(e, "PANNumber")} disabled={!editKYC} />
                                                                        <p className="error-text" >{errPANNumber}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 col-lg-6 offset-xxl-1 col-xxl-4">
                                                                    <div className="upd-img-sec">
                                                                        <div className="custom-file">
                                                                            {editKYC &&
                                                                                <input type="file"
                                                                                    id="PANInput"
                                                                                    accept="image/*"
                                                                                    onChange={(event) => handleChange(event, 'PANImage')}
                                                                                    disabled={PANInputDisable || !editKYC}
                                                                                />}

                                                                            {PANImage ? (
                                                                                <img id="PANimg" alt="not found" width={"250px"} src={typeof PANImage === 'string' ? PANImage : URL.createObjectURL(PANImage)} />
                                                                            ) : editKYC ?
                                                                                <>
                                                                                    <p className="small-text">Upload Front View</p>
                                                                                    <span className="select-file">SELECT FILE</span>
                                                                                </> :
                                                                                <>
                                                                                    <p className="small-text">Upload Front View</p>
                                                                                </>
                                                                            }
                                                                        </div>
                                                                        {PANImage &&
                                                                            (
                                                                                <button onClick={handleRemovePANImage} disabled={!editKYC} className={statusKYC !== 'approved' ? "p-0 border-0 bg-transparent" : 'd-none'}>
                                                                                    <img src={BlackCross} alt="removeImage" />
                                                                                </button>
                                                                            )}
                                                                    </div>
                                                                    <p className="error-text">{errPANImg}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="kyc-box">
                                                        <div className="kyc-header">
                                                            <h6 className="white-text">Other KYC Document</h6>
                                                        </div>
                                                        <div className="table-cnt-box kyc-body">
                                                            <div className="row">
                                                                <div className="col-md-12 col-lg-12 offset-xxl-1 col-xxl-10">
                                                                    <div className="row">
                                                                        <div className="col-md-12 d-flex justify-content-center doc-list" onChange={(e) => { handleChange(e, 'Document') }}>
                                                                            <div className="form-group blue-radio">
                                                                                <label htmlFor="aadharcard" className="d-flex align-items-center">
                                                                                    <div className="custom-radio">
                                                                                        <input id="aadharcard" type="radio" value="AdhaarCard" name="documents" disabled={!editKYC} checked={KYCDocumentType === 'AdhaarCard'} />
                                                                                        <span></span>
                                                                                    </div>
                                                                                    Aadhaar Card
                                                                                </label>
                                                                            </div>
                                                                            <div className="form-group blue-radio">
                                                                                <label htmlFor="voterid" className="d-flex align-items-center">
                                                                                    <div className="custom-radio">
                                                                                        <input id="voterid" value="VoterId" type="radio" name="documents" disabled={!editKYC} checked={KYCDocumentType === 'VoterId'} />
                                                                                        <span></span>
                                                                                    </div>
                                                                                    Voter ID
                                                                                </label>
                                                                            </div>
                                                                            <div className="form-group blue-radio">
                                                                                <label htmlFor="licence" className="d-flex align-items-center">
                                                                                    <div className="custom-radio">
                                                                                        <input id="licence" value="DrivingLicence" type="radio" name="documents" disabled={!editKYC} checked={KYCDocumentType === 'DrivingLicence'} />
                                                                                        <span></span>
                                                                                    </div>
                                                                                    Driving Licence
                                                                                </label>
                                                                            </div>
                                                                            <div className="form-group blue-radio">
                                                                                <label htmlFor="passport" className="d-flex align-items-center">
                                                                                    <div className="custom-radio">
                                                                                        <input id="passport" value="Passport" type="radio" name="documents" disabled={!editKYC} checked={KYCDocumentType === 'Passport'} />
                                                                                        <span></span>
                                                                                    </div>
                                                                                    Passport
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="upd-img-sec ml-auto">
                                                                                <div className="custom-file ms-auto">
                                                                                    {editKYC &&
                                                                                        <input type="file"
                                                                                            accept="image/*"
                                                                                            onChange={(event) => handleChange(event, 'KYCFrontImage')}
                                                                                            disabled={KYCFrontInputDisable || !editKYC}
                                                                                        />
                                                                                    }
                                                                                    {KYCFrontImage ? (
                                                                                        <img id="KYCFront" alt="not found" width={"250px"} src={typeof KYCFrontImage === 'string' ? KYCFrontImage : URL.createObjectURL(KYCFrontImage)} />
                                                                                    ) : editKYC ?
                                                                                        <>
                                                                                            <p className="small-text">Upload Front View</p>
                                                                                            <span className="select-file">SELECT FILE</span>
                                                                                        </> :
                                                                                        <>
                                                                                            <p className="small-text">Upload Front View</p>
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                                {KYCFrontImage &&
                                                                                    (
                                                                                        <button onClick={handleRemoveKYCFrontImage} disabled={!editKYC} className={statusKYC !== 'approved' ? "p-0 border-0 bg-transparent" : 'd-none'}>
                                                                                            <img src={BlackCross} alt="removeImage" />
                                                                                        </button>
                                                                                    )}
                                                                                <p className="error-text">{errKYCFrontImg}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="upd-img-sec">
                                                                                <div className="custom-file">
                                                                                    {editKYC &&
                                                                                        <input type="file"
                                                                                            accept="image/*"
                                                                                            onChange={(event) => handleChange(event, 'KYCBackImage')}
                                                                                            disabled={KYCBackInputDisable || !editKYC}
                                                                                        />
                                                                                    }
                                                                                    {KYCBackImage ? (
                                                                                        <img id="KYCBack" alt="not found" width={"250px"} src={typeof KYCBackImage === 'string' ? KYCBackImage : URL.createObjectURL(KYCBackImage)} />
                                                                                    ) : editKYC ?
                                                                                        <>
                                                                                            <p className="small-text">Upload Back View</p>
                                                                                            <span className="select-file">SELECT FILE</span>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <p className="small-text">Upload Back View</p>
                                                                                        </>
                                                                                    }
                                                                                </div>
                                                                                {KYCBackImage &&
                                                                                    (
                                                                                        <button onClick={handleRemoveKYCBackImage} disabled={!editKYC} className={statusKYC !== 'approved' ? "p-0 border-0 bg-transparent" : 'd-none'}>
                                                                                            <img src={BlackCross} alt="removeImage" />
                                                                                        </button>
                                                                                    )}
                                                                                <p className="error-text">{errKYCBackImg}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {statusKYC && <p>Status: <span className='text-capitalize'>{statusKYC}</span></p>}
                                                        {statusKYC === 'rejected' && <p>Reason: <span className='text-capitalize'>{rejectReason}</span></p>}
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="small-text">You may also email us your KYC Documents to <a href="mailto:care@pokerlion.com" className="common-link">care@pokerlion.com</a></p>
                                                        <button type="submit" disabled={!disableKYC} className={editKYC ? "common-btn yellow-btn" : "d-none"}>UPLOAD & SAVE</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="row bank-details">
                                        <div className="offset-md-2 col-md-8 offset-lg-2 col-lg-8 offset-xxl-3 col-xxl-6">
                                            <form>
                                                <div className="form-group">
                                                    <label className="label">Bank Name</label>
                                                    <input disabled={bankFormInput} type="text" value={bankName} onChange={(e) => handleChange(e, "BankName")} />
                                                    <p className="error-text">{errBankName}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">IFSC Code</label>
                                                    <input disabled={bankFormInput} type="text" maxLength="11" value={IFSCCode} onChange={(e) => handleChange(e, "IFSC")} />
                                                    <p className="error-text">{errIFSCCode}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Holder Name</label>
                                                    <input disabled={bankFormInput} type="text" value={holderName} onChange={(e) => handleChange(e, "HolderName")} />
                                                    <p className="error-text">{errHolderName}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Account Number</label>
                                                    <input disabled={bankFormInput} type="password" value={accountNumber} onChange={(e) => handleChange(e, "AccountNumber")} />
                                                    <p className="error-text">{errAccountNumber}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className="label">Confirm Account Number</label>
                                                    <input disabled={bankFormInput} type="number" value={confirmAccountNumber} onChange={(e) => handleChange(e, "ConfimAccountNumber")} />
                                                    <p className="error-text">{errConfirmAccountNumber}</p>
                                                </div>
                                                <div className={bankFormInput ? "d-none" : "text-center"}>
                                                    <button type="submit" disabled={!disableBankSubmit} onClick={handleBankDetails} className="common-btn yellow-btn small-btn">submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Prompt
                    when={editKYC}
                    message='Data will be lost if you leave the page, are you sure?'
                />
            </div>
        </>
    );
}

export default connect()(MyProfile);
