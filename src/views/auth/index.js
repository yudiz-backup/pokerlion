/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button, Modal, ModalHeader } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import Select from 'react-select'
import { connect, useDispatch, useSelector } from 'react-redux'
import { OldSocialLogin as SocialLogin } from 'react-social-login'
import { GoogleLogin } from 'react-google-login'
import { history } from '../../App'
import { verifyEmail, verifyPassword, verifyLength, verifyMobileNumber, verifyPincode } from '../../helper'
import { register, login, referralVerify, otpVerify, forgotPassword, resetPasswordVerify, resendOTP, socialLogin } from '../../actions/auth'
import { options } from '../../assets/data/state'
import Loading from '../../components/Loading'
import constants from '../../constants';

import logo from '../../assets/images/logo.png';
import fb from '../../assets/images/facebook.svg';
import gmail from '../../assets/images/gmail.svg';

function AuthHeader() {

    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')
    const [referral, setReferral] = useState('')
    const [referredById, setReferredById] = useState('')
    const [gender, setGender] = useState('')
    const [switchToLogin, setSwitchToLogin] = useState(false)
    const [switchToForgotPassword, setSwitchToForgotPassword] = useState(false)
    const [switchToOTP, setSwitchToOTP] = useState(false)
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [mobileNumberLogin, setMobileNumberLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [state, setState] = useState(null)
    const [pincode, setPincode] = useState('')
    const [eyeIcon, setEyeIcon] = useState(false)
    const [otp, setOTP] = useState('')
    const [newPasswordInputShow, setNewPasswordInputShow] = useState(false)
    const [OTPverificationId, setOTPVerificationId] = useState('')
    const [referralVerified, setReferralVerified] = useState(false)
    const [emailFP, setEmailFP] = useState('')
    const [mobFP, setMobFP] = useState('')
    const [emailMobFP, setEmailMobFP] = useState('')
    const [forgotPasswordId, setForgotPasswordId] = useState('')
    const [resetPassword, setResetPassword] = useState('')
    const [isChecked, setIsChecked] = useState(true)
    const [resendButtonShow, setResendButtonShow] = useState(false)
    const [showConfirmMessage, setShowConfirmMessage] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [showModalCloseConfirmMessage, setShowModalCloseConfirmMessage] = useState(false)
    const [loading, setLoading] = useState();
    const [registrationOTPScreen, setRegistrationOTPScreen] = useState(false);
    const [socialAccessToken, setSocialAccessToken] = useState('');

    const [errEmail, setErrEmail] = useState('')
    const [errMobileNumber, setErrMobileNumber] = useState('')
    const [errPassword, setErrPassword] = useState('')
    const [errMobileNumberLogin, setErrMobileNumberLogin] = useState('')
    const [errState, setErrState] = useState('')
    const [errPincode, setErrPincode] = useState('')
    const [errEmailMobFP, setErrEmailMobFP] = useState('')
    const [errPasswordLogin, setErrPasswordLogin] = useState('')
    const [errResetPassword, setErrResetPassword] = useState('')
    const [errOTP, setErrOTP] = useState('')



    const dispatch = useDispatch()
    const resMessage = useSelector(state => state.auth.resMessage)
    const ReferralStatus = useSelector(state => state.auth.resStatusReferral)
    const referralId = useSelector(state => state.auth.referralId)
    const verificationId = useSelector(state => state.auth.verificationId)
    const loginStatus = useSelector(state => state.auth.resStatusLogin)
    const registrationStatus = useSelector(state => state.auth.resStatusReg)
    const OTPStatus = useSelector(state => state.auth.resStatusOTP)
    const forgotPasswordStatus = useSelector(state => state.auth.resStatusFP)
    const forgotPasswordVerificationId = useSelector(state => state.auth.forgotPasswordVerificationId)
    const resetPasswordStatus = useSelector(state => state.auth.resStatusRP)
    const socialRegistrationData = useSelector(state => state.auth.socialRegistrationData)
    const accessToken = useSelector(state => state.auth.accessToken)
    const socialGoogleStatus = useSelector(state => state.auth.resStatusSocial)
    const socialMobileNumber = useSelector(state => state.auth.mobileNumber)
    const socialVerificationId = useSelector(state => state.auth.resendOTPVerificationId)
    const resendOTPStatus = useSelector(state => state.auth.resStatusResendOTP)

    const previousProps = useRef({ registrationStatus, loginStatus, OTPStatus, resendOTPStatus, resetPasswordStatus }).current

    const toggleNavbar = () => setIsOpen(!isOpen);
    const toggleModalOpen = () => {
        if (((switchToLogin == false && switchToForgotPassword == false && modal == true) && (email?.length || password?.length || mobileNumber?.length || state?.length || pincode?.length)) || (switchToOTP == true)) {
            setShowModalCloseConfirmMessage(true)
        }
        else {
            setModal(!modal)
            setShowModalCloseConfirmMessage(false)
            setErrEmail('')
            setErrMobileNumber('')
            setErrPassword('')
            setErrState('')
            setErrPincode('')
            setErrResetPassword('')
            setErrOTP('')
        }
        setSwitchToLogin(false)
        setSwitchToForgotPassword(false)
        setMobileNumberLogin('')
        setPasswordLogin('')
        setEmailFP('')
        setMobFP('')
        setEmailMobFP('')
        setForgotPasswordId('')
        setIsChecked(true)
        setShowConfirmMessage(false)
        setRegistrationOTPScreen(false)
        setDisableSubmit(false)

        setErrMobileNumberLogin('')
        setErrPasswordLogin('')
        setErrEmailMobFP('')
    }

    useEffect(() => {
        document.title = 'PokerLion'
    }, [])


    useEffect(() => {
        if (localStorage.getItem('ForgotPasswordOTP')) {
            setModal(true)
            setNewPasswordInputShow(true)
            const data = JSON.parse(localStorage.getItem('ForgotPasswordOTP'))
            setEmailMobFP(data?.EmailMob)
            setForgotPasswordId(data?.verificationId)
            setSwitchToOTP(true)
        }
        if (localStorage.getItem('RegistrationOTP')) {
            setModal(true)
            setNewPasswordInputShow(false)
            const data = JSON.parse(localStorage.getItem('RegistrationOTP'))
            setMobileNumber(data?.mobileNumber)
            setOTPVerificationId(data?.verificationId)
            setSwitchToOTP(true)
        }
        if (localStorage.getItem('LoginOTP')) {
            setModal(true)
            setNewPasswordInputShow(false)
            setSwitchToOTP(true)
            const mobileNumber = localStorage.getItem('LoginOTP')
            dispatch(resendOTP(mobileNumber))
            setMobileNumberLogin(mobileNumber)
        }
        if (localStorage.getItem('SocialLoginOTP')) {
            setModal(true)
            setNewPasswordInputShow(false)
            setSwitchToOTP(true)
            const mobileNumber = localStorage.getItem('SocialLoginOTP')
            dispatch(resendOTP(mobileNumber))
            setMobileNumberLogin(mobileNumber)
        }
        document.title = "PokerLion"
    }, [])

    useEffect(() => {
        if (resMessage?.length) {
            setLoading(false)
            toast(
                <div>
                    <div>{resMessage}</div>
                </div>
            );
        }
    }, [resMessage])

    useEffect(() => {
        if (socialRegistrationData) {
            setEmail(socialRegistrationData?.fields?.sEmail)
            setSwitchToLogin(false)
            setErrEmail('')
        }
    }, [socialRegistrationData])

    useEffect(() => {
        if (accessToken) {
            setSocialAccessToken(accessToken)
        }
    }, [accessToken])

    useEffect(() => {
        if (socialGoogleStatus == false) {
            if (resMessage == 'Mobile number not verified') {
                setLoading(false)
                setSwitchToOTP(true)
                const mobileNumber = socialMobileNumber.slice(3);
                dispatch(resendOTP(mobileNumber))
                localStorage.setItem('SocialLoginOTP', mobileNumber)
            }
        }

    }, [socialGoogleStatus])

    useEffect(() => {
        if (socialVerificationId) {
            setLoading(false)
            setOTPVerificationId(socialVerificationId)
        }
    }, [socialVerificationId])

    useEffect(() => {
        if (ReferralStatus == true) {
            setReferralVerified(true)
            setReferredById(referralId)
            setLoading(false)
        } else if (ReferralStatus == false) {
            setReferral('')
            setLoading(false)
        }
    }, [ReferralStatus])

    useEffect(() => {
        if (switchToOTP == true) {
            window.onbeforeunload = function () {
                return true;
            };
            setResendButtonShow(false)
        }
        return () => {
            window.onbeforeunload = null;
        };
    }, [switchToOTP]);

    useEffect(() => {
        if (previousProps.registrationStatus !== registrationStatus) {
            if (registrationStatus == true) {
                setSwitchToOTP(true)
                const RegistrationData = { 'verificationId': verificationId, 'mobileNumber': mobileNumber }
                localStorage.setItem('RegistrationOTP', JSON.stringify(RegistrationData));
                setNewPasswordInputShow(false)
                setOTPVerificationId(verificationId)
                setShowConfirmMessage(false)
                setRegistrationOTPScreen(true)
                setLoading(false)
            }
            else if (registrationStatus == false) {
                if (resMessage == 'User already exists with email id' || resMessage == 'User already exists with mobile number') {
                    setShowConfirmMessage(false)
                    setLoading(false)
                } else {
                    setEmail('')
                    setPassword('')
                    setMobileNumber('')
                    setReferral('')
                    setState('')
                    setGender('')
                    setPincode('')
                    setLoading(false)
                    setShowConfirmMessage(false)
                }
                setDisableSubmit(false)
            }
        }
        return () => {
            previousProps.registrationStatus = registrationStatus
        }
    }, [registrationStatus])


    useEffect(() => {
        if (previousProps.loginStatus !== loginStatus) {
            if (loginStatus == true) {
                setLoading(false)
                setModal(false)
                history.push('/lobby')
            }
            else if (loginStatus == false) {
                if (resMessage == 'Mobile number not verified') {
                    setLoading(false)
                    setSwitchToLogin(false)
                    setSwitchToOTP(true)
                    setPasswordLogin('')
                    setIsChecked(true)
                    dispatch(resendOTP(mobileNumberLogin))
                    localStorage.setItem('LoginOTP', mobileNumberLogin)
                } else {
                    setLoading(false)
                    setIsChecked(true)
                }
            }
        }
        return () => {
            previousProps.loginStatus = loginStatus
        }
    }, [loginStatus])

    useEffect(() => {
        if (previousProps.OTPStatus !== OTPStatus) {
            if (OTPStatus == false) {
                setLoading(false)
                setOTP('')
                setErrOTP('')
            }
        }
        return () => {
            previousProps.OTPStatus = OTPStatus
        }
    }, [OTPStatus])

    useEffect(() => {
        if (forgotPasswordStatus == true) {
            setSwitchToForgotPassword(false)
            setSwitchToOTP(true)
            setNewPasswordInputShow(true)
            setForgotPasswordId(forgotPasswordVerificationId)
            let dataObject = { 'verificationId': forgotPasswordVerificationId, 'EmailMob': emailMobFP }
            localStorage.setItem('ForgotPasswordOTP', JSON.stringify(dataObject));
            setLoading(false)
        } else if (forgotPasswordStatus == false) {
            setLoading(false)
            setEmailMobFP('')
        }
    }, [forgotPasswordStatus])

    useEffect(() => {
        if (previousProps.resetPasswordStatus !== resetPasswordStatus) {
            if (resetPasswordStatus == true) {
                localStorage.removeItem('ForgotPasswordOTP');
                localStorage.removeItem('OTPTimer');
                setSwitchToLogin(true)
                setSwitchToOTP(false)
                setNewPasswordInputShow(false)
                setForgotPasswordId('')
                setOTP('')
                setResetPassword('')
                setLoading(false)
            } else if (resetPasswordStatus == false) {
                setLoading(false)
                setOTP('')
                setResetPassword('')
            }
        }
        return () => {
            previousProps.resetPasswordStatus = resetPasswordStatus
        }
    }, [resetPasswordStatus])

    useEffect(() => {
        if (previousProps.resendOTPStatus !== resendOTPStatus) {
            if (resendOTPStatus == true) {
                setLoading(false)
            }
            if (resendOTPStatus == false) {
                setLoading(false)
            }
        }
        return () => {
            previousProps.resendOTPStatus = resendOTPStatus
        }
    }, [resendOTPStatus])



    function handleSwitch(type) {
        switch (type) {
            case 'Login':
                setSwitchToLogin(true)
                break
            case 'Reg':
                setSwitchToLogin(false)
                break
            case 'FP':
                setSwitchToForgotPassword(true)
                setSwitchToLogin(false)
                setEmailMobFP('')
                setEmailFP('')
                setMobFP('')
                break
            case 'backToLogin':
                setSwitchToLogin(true)
                setSwitchToForgotPassword(false)
                break
        }
    }

    function handleChangeOtp(otp) {
        setOTP(otp)
    }

    function handlePasswordVisibility() {
        setEyeIcon(eyeIcon => !eyeIcon)
        setPasswordVisibility(passwordVisibility => !passwordVisibility)
    }

    function handleState(e) {
        setState(e.value)
        setErrState('')
    }
    const removeEmptySpaces = stringVal => {
        return /\s/g.test(stringVal);
    };


    function handleChange(event, type) {
        let isValid = false
        switch (type) {
            case 'Email':
                if (verifyLength(event.target.value, 1) && verifyEmail(event.target.value)) {
                    setErrEmail('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrEmail('Enter your Email')
                } else {
                    setErrEmail('Enter a valid Email id')
                }
                setEmail(event.target.value)
                break
            case 'Password':
                if (verifyPassword(event.target.value)) {
                    setErrPassword('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrPassword('Enter your password')
                }
                if (!verifyLength(event.target.value, 6)) {
                    setErrPassword('Password need to be at least 6 characters')
                }
                isValid = removeEmptySpaces(event.target.value)
                if (isValid == false) {
                    setPassword(event.target.value)
                }
                break
            case 'Mob':
                if (verifyLength(event.target.value, 1) && verifyMobileNumber(event.target.value)) {
                    setErrMobileNumber('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrMobileNumber('Enter your Mobile Number')
                } else {
                    setErrMobileNumber('Enter a valid Mobile Number')
                }
                setMobileNumber(event.target.value)
                break
            case 'PasswordLogin':
                if (verifyPassword(event.target.value)) {
                    setErrPasswordLogin('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrPasswordLogin('Enter your password')
                } if (!verifyLength(event.target.value, 6)) {
                    setErrPasswordLogin('Password need to be at least 6 characters')
                }
                isValid = removeEmptySpaces(event.target.value)
                if (isValid == false) {
                    setPasswordLogin(event.target.value)
                }
                break
            case 'MobLogin':
                if (verifyLength(event.target.value, 1) && verifyMobileNumber(event.target.value)) {
                    setErrMobileNumberLogin('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrMobileNumberLogin('Enter your Mobile Number')
                } else {
                    setErrMobileNumberLogin('Enter a valid Mobile Number')
                }
                setMobileNumberLogin(event.target.value)
                break
            case 'RememberMe':
                setIsChecked(event.target.checked)
                break
            case 'Pincode':
                if (verifyPincode(event.target.value)) {
                    setErrPincode('')
                } else if (!verifyPincode(event.target.value)) {
                    setErrPincode('Enter a valid Pin Code')
                } else {
                    setErrPincode('Enter a valid Pin Code')
                }
                setPincode(event.target.value)
                break
            case 'Referral':
                setReferral(event.target.value.replace(/[^a-zA-Z0-9]/gi, ""))
                break
            case 'Radio':
                setGender(event.target.value)
                break
            case 'ForgotPassword':
                if ((verifyLength(event.target.value, 1) && verifyEmail(event.target.value))) {
                    setEmailFP(event.target.value)
                    setMobFP('')
                    setErrEmailMobFP('')
                } else if ((verifyLength(event.target.value, 1) && verifyMobileNumber(event.target.value))) {
                    setMobFP(event.target.value)
                    setEmailFP('')
                    setErrEmailMobFP('')
                }
                else {
                    setErrEmailMobFP("Please enter valid Email or Mobile Number")
                }
                setEmailMobFP(event.target.value)
                break
            case 'ResetPassword':
                if ((verifyLength(event.target.value, 1) && verifyPassword(event.target.value))) {
                    setErrResetPassword('')
                } else if (!verifyLength(event.target.value, 1)) {
                    setErrResetPassword('Please enter your new password')
                }
                else {
                    setErrResetPassword('Password need to be at least 6 characters')
                }
                setResetPassword(event.target.value)
                break
            default:
                break
        }
    }

    function handleReferralCode() {
        if (referral?.length) {
            dispatch(referralVerify(referral))
            setLoading(true)
        }
    }

    function handleChangeData() {
        setShowConfirmMessage(false)
        setDisableSubmit(false)
    }

    function handleModalOpen(e) {
        e.preventDefault()
        setShowModalCloseConfirmMessage(false)
    }
    function handleModalClose(e) {
        e.preventDefault()
        setShowModalCloseConfirmMessage(false)
        setModal(false)
        localStorage.removeItem('ForgotPasswordOTP')
        localStorage.removeItem('RegistrationOTP')
        localStorage.removeItem('LoginOTP')
        localStorage.removeItem('SocialLoginOTP')
        localStorage.removeItem('OTPTimer')

        setSwitchToOTP(false)
        setEmail('')
        setMobileNumber('')
        setPassword('')
        setReferral('')
        setReferredById('')
        setReferralVerified(false)
        setState('')
        setGender('')
        setPincode('')
        setOTP('')
        setNewPasswordInputShow(false)
        setResendButtonShow(false)
        setResetPassword('')
        setEyeIcon(false)
        setPasswordVisibility(false)
    }


    function Register(e) {
        e.preventDefault()
        if (verifyLength(email, 1) && verifyLength(password, 1) && verifyLength(mobileNumber, 1) && verifyLength(state, 1) && verifyLength(pincode, 1) && verifyEmail(email) && verifyPassword(password) && verifyMobileNumber(mobileNumber) && verifyPincode(pincode)) {
            setShowConfirmMessage(true)
        } else {
            if (!verifyLength(email, 1)) {
                setErrEmail('Please enter your email')
            }
            if (!verifyLength(password, 1)) {
                setErrPassword('Please enter your password')
            }
            if (!verifyLength(mobileNumber, 1)) {
                setErrMobileNumber('Please enter your mobile number')
            }
            if (!verifyLength(state, 1)) {
                setErrState('Select your current state')
            }
            if (!verifyLength(pincode, 1)) {
                setErrPincode('Please enter your area pincode')
            }
        }
    }

    function Login(e) {
        e.preventDefault()
        if (verifyLength(passwordLogin, 1) && verifyPassword(passwordLogin) && !errMobileNumberLogin && !errPasswordLogin) {
            setLoading(true)
            dispatch(login(mobileNumberLogin, passwordLogin, isChecked))
        } else {
            if (!verifyLength(mobileNumberLogin, 1)) {
                setErrMobileNumberLogin('Please enter your mobile number')
            }
            if (!verifyLength(passwordLogin, 1)) {
                setErrPasswordLogin('Please enter your password')
            }
        }
    }


    function handleOTP(e, type) {
        e.preventDefault()
        switch (type) {
            case 'RegistrationOTP':
                if (otp?.length == 4 && OTPverificationId?.length) {
                    dispatch(otpVerify(otp, OTPverificationId))
                    setLoading(true)
                    setOTPVerificationId('')
                }
                else {
                    if (!verifyLength(otp, 1)) {
                        setErrOTP('Enter the OTP')
                    }
                    if (otp?.length < 4 && otp?.length > 1) {
                        setErrOTP('Please enter a valid OTP')
                    }
                }
                break
            case 'ResetPassword':
                if (otp?.length == 4 && forgotPasswordId?.length && resetPassword?.length && !errResetPassword) {
                    dispatch(resetPasswordVerify(otp, resetPassword, forgotPasswordId))
                    setErrOTP('')
                    setErrResetPassword('')
                    setLoading(true)
                }
                else {
                    if (!verifyLength(otp, 1)) {
                        setErrOTP('Enter the OTP')
                    }
                    if (otp?.length < 4 && otp?.length > 1) {
                        setErrOTP('Please enter a valid OTP')
                    }
                    if (!verifyLength(resetPassword, 1)) {
                        setErrResetPassword('Please enter your new password')
                    }
                }
        }
    }

    function handleRegistration(e) {
        e.preventDefault()
        setDisableSubmit(true)
        setLoading(true)

        if (socialAccessToken?.length) {
            dispatch(register(email, password, mobileNumber, referredById ? referredById : '', gender, state, pincode, socialAccessToken))
            setSocialAccessToken('')
        } else {
            dispatch(register(email, password, mobileNumber, referredById ? referredById : '', gender, state, pincode, null))
            setSocialAccessToken('')
        }
    }


    function handleForgotPassword(event) {
        event.preventDefault()
        if (verifyLength(emailMobFP, 1) && !errEmailMobFP) {
            setLoading(true)
            dispatch(forgotPassword(emailFP, mobFP))
            setEmailFP('')
            setMobFP('')
        } else {
            setErrEmailMobFP('Enter the Email adderess or Mobile number')
        }
    }


    function handleResendOtp() {
        if (newPasswordInputShow == true) {
            dispatch(resendOTP(emailMobFP))
            setLoading(true)
        } else if (registrationOTPScreen == true) {
            dispatch(resendOTP(mobileNumber))
            setLoading(true)
        }
        else {
            dispatch(resendOTP(mobileNumberLogin))
            setLoading(true)
        }
        setResendButtonShow(false)
        setStatus(STATUS.STARTED)
        setSecondsRemaining(INITIAL_COUNT)
    }


    const INITIAL_COUNT = 120
    const twoDigits = (num) => String(num).padStart(2, '0')

    const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT)
    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60

    useEffect(() => {
        if (switchToOTP === true) {
            setStatus(STATUS.STARTED)
            if (localStorage.getItem('OTPTimer') === null) {
                setSecondsRemaining(INITIAL_COUNT)
            } else {
                setSecondsRemaining(localStorage.getItem('OTPTimer'))
            }
            localStorage.setItem('OTPTimer', secondsRemaining)
        }
    }, [switchToOTP])

    useEffect(() => {
        if (switchToOTP === true) {
            localStorage.setItem('OTPTimer', secondsRemaining)
        }
    }, [switchToOTP, secondsRemaining])

    const STATUS = {
        STOPPED: null
    }
    const [status, setStatus] = useState(STATUS.STOPPED)

    useEffect(() => {
        if (status === null) {
            setResendButtonShow(true)
        } else {
            setResendButtonShow(false)
        }
    }, [status])
    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                setStatus(STATUS.STOPPED)
            }
        },
        status == STATUS.STARTED ? 1000 : null,
    )
    function useInterval(callback, delay) {
        const savedCallback = useRef()

        useEffect(() => {
            savedCallback.current = callback
        }, [callback])

        useEffect(() => {
            function tick() {
                savedCallback.current()
            }
            if (delay !== null) {
                let id = setInterval(tick, delay)
                return () => clearInterval(id)
            }
        }, [delay])
    }

    const responseGoogle = (response) => {
        const accessToken = response?.tokenObj?.id_token
        if (accessToken) {
            dispatch(socialLogin('Google', accessToken))
            setLoading(true)
        }
    }

    function facebookLogin(user) {
        if (user?._token?.accessToken) {
            const accessToken = user?._token?.accessToken
            const userId = user?._profile?.id
            if (accessToken) {
                dispatch(socialLogin('Facebook', accessToken, userId))
                setLoading(true)
            }
        }
    }

    return (
        <div>
            {loading && <Loading />}
            <header>
                <Navbar color="light" light expand="md">
                    <NavbarBrand><img src={logo} alt="logo" /></NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} />
                    <Collapse isOpen={isOpen} navbar className="justify-content-end">
                        <Nav className="ml-auto align-items-center before-login" navbar>
                            <NavItem>
                                <Button onClick={toggleModalOpen} className="play-now">Play Now</Button>
                                <Modal isOpen={modal} toggle={toggleModalOpen} className="auth-modal">
                                    <div className="modal-cnt">
                                        <ModalHeader className="p-0" toggle={toggleModalOpen}></ModalHeader>


                                        {/* Registration */}
                                        <div className="register-dtl" style={{ "display": (switchToLogin || switchToForgotPassword || switchToOTP) ? "none" : "block" }}>
                                            <div className="auth-dtl">
                                                <div className="text-center">
                                                    <img src={logo} alt="logo" />
                                                    <h3 className="text-center">Register</h3>
                                                </div>
                                                <form>
                                                    <div className="form-group">
                                                        <input type="email" placeholder="Email" value={email} onChange={(e) => { handleChange(e, 'Email') }} />
                                                        <p className="error-text">{errEmail}</p>
                                                    </div>
                                                    <div className="form-group pass-field">
                                                        <input type={passwordVisibility ? "text" : "password"} placeholder="Password (atleast 6 characters)" value={password} onChange={(e) => { handleChange(e, 'Password') }} />
                                                        <button type="button" className={eyeIcon ? "pass hide border-0 bg-transparent" : "pass border-0 bg-transparent"} onClick={handlePasswordVisibility}></button>
                                                        <p className="error-text">{errPassword}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="half-input d-flex">
                                                            <div>
                                                                <input type="text" value="+91" readOnly />
                                                            </div>
                                                            <div>
                                                                <input type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 10)} placeholder="Mobile Number" value={mobileNumber} onChange={(e) => { handleChange(e, 'Mob') }} />
                                                                <p className="error-text">{errMobileNumber}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group state-input d-flex justify-content-between">
                                                        <div >
                                                            <Select
                                                                options={options}
                                                                onChange={(e) => handleState(e)}
                                                                value={options.filter(function (option) {
                                                                    return option.value == state;
                                                                })}
                                                                placeholder='Select a State'
                                                            />
                                                            <p className="error-text">{errState}</p>
                                                        </div>
                                                        {/* <div>
                                                            <input type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 6)} placeholder="Pin Code" value={pincode} onChange={(e) => { handleChange(e, 'Pincode') }} />
                                                            <p className="error-text">{errPincode}</p>
                                                        </div> */}
                                                    </div>
                                                    <div className="form-group referral-input pass-field">
                                                        <input type="text" placeholder="Referral code" maxLength="13" value={referral} onChange={(e) => { handleChange(e, 'Referral') }} />
                                                        <a type="button" className={referralVerified ? "success border-0 bg-transparent" : "border-0 bg-transparent"} onClick={handleReferralCode}>Apply</a>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="radio-list cust-input-list d-flex" onChange={(e) => { handleChange(e, 'Radio') }}>
                                                            <p>Gender (Optional)</p>
                                                            <label htmlFor="radio" className="d-flex align-items-center">
                                                                <div className="custom-radio">
                                                                    <input id="radio" type="radio" name="gen" value='male'
                                                                    />
                                                                    <span></span>
                                                                </div>
                                                                Male
                                                            </label>
                                                            <label htmlFor="radio2" className="d-flex align-items-center">
                                                                <div className="custom-radio">
                                                                    <input id="radio2" type="radio" name="gen"
                                                                        value='female' />
                                                                    <span></span>
                                                                </div>
                                                                Female
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="cust-input-list d-flex justify-content-between align-items-center">
                                                            <label className="d-flex">
                                                                <div className="custom-checkbox">
                                                                    <input type="checkbox"/>
                                                                    <span></span>
                                                                </div>
                                                                <small>I confirm that I am above 18 years and agree all <a target="_blank" href="#" rel="noreferrer" className="common-link">Age Restriction Disclaimer</a></small>
                                                            </label>                                                            
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="cust-input-list d-flex justify-content-between align-items-center">
                                                            <label className="d-flex">
                                                                <div className="custom-checkbox">
                                                                    <input type="checkbox"/>
                                                                    <span></span>
                                                                </div>
                                                                <small>I am not resident of Andhra Pradehsh, Andaman and Nicobar, Arunachal Pradesh, Assam, Gujarat, Nagaland, Telangana, and agree to all the <a target="_blank" href="https://pokerlion.com/terms-condition.php" rel="noreferrer" className="common-link">Terms and Conditions</a></small>
                                                            </label>                                                            
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="button" onClick={Register} className="common-btn yellow-btn">register</button>
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <p>Existing User?</p><button type="button" className="common-link auth-link border-0 bg-transparent" onClick={() => handleSwitch('Login')}>Login</button>
                                                    </div>
                                                    <div className="text-center overflow-hidden">
                                                        <div className="field-seprator">OR</div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <ul className="p-0 social-list d-flex justify-content-center">
                                                            {/* <li className="google-btn">
                                                                <img src={fb} alt="facebook" />
                                                                <SocialLogin
                                                                    provider='facebook'
                                                                    appId={constants.FACEBOOK_APP_ID}
                                                                    callback={facebookLogin}
                                                                >
                                                                    <Button type="button">  </Button>
                                                                </SocialLogin>
                                                            </li> */}
                                                            <li className="google-btn">
                                                                <img src={gmail} alt="gmail" />
                                                                <GoogleLogin
                                                                    clientId={constants.GOOGLE_CLIENT_ID}
                                                                    buttonText="Sign In"
                                                                    onSuccess={responseGoogle}
                                                                    onFailure={responseGoogle}
                                                                    cookiePolicy={'single_host_origin'} />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="text-center">
                                                <p className="small-text">By registering you accept that you are 18+ and agree to our <a target="_blank" href="https://www.rummy24.com/terms-condition" rel="noreferrer" className="common-link">Terms and Conditions</a></p>
                                                <p className="small-text">For any kind of queries, contact us on <a href="mailto:support@rummy24.com" className="common-link">support@rummy24.com</a></p>
                                            </div> */}
                                        </div>


                                        {/* Login */}
                                        <div className="login-dtl" style={{ "display": switchToLogin ? "block" : "none" }}>
                                            <div className="auth-dtl">
                                                <div className="text-center">
                                                    <img src={logo} alt="logo" />
                                                    <h3 className="text-center">Login</h3>
                                                </div>
                                                <form>
                                                    <div className="form-group">
                                                        <div className="half-input d-flex">
                                                            <div>
                                                                <input type="text" value="+91" readOnly />
                                                            </div>
                                                            <div>
                                                                <input type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 10)} placeholder="Mobile Number" value={mobileNumberLogin} onChange={(e) => { handleChange(e, 'MobLogin') }} />
                                                                <p className="error-text">{errMobileNumberLogin}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group pass-field">
                                                        <input type={passwordVisibility ? "text" : "password"} placeholder="Password" value={passwordLogin} onChange={(e) => { handleChange(e, 'PasswordLogin') }} />
                                                        <button type="button" className={eyeIcon ? "pass hide border-0 bg-transparent" : "pass border-0 bg-transparent"} onClick={handlePasswordVisibility}></button>
                                                        <p className="error-text">{errPasswordLogin}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="cust-input-list d-flex justify-content-between align-items-center">
                                                            <label htmlFor="chkbox" className="d-flex align-items-center">
                                                                <div className="custom-checkbox">
                                                                    <input id="chkbox" type="checkbox" checked={isChecked} onChange={(e) => { handleChange(e, 'RememberMe') }} />
                                                                    <span></span>
                                                                </div>
                                                                Remember Me
                                                            </label>
                                                            <button type="button" className="common-link auth-link border-0 bg-transparent" onClick={() => handleSwitch("FP")}>Forgot Password?</button>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="button" className="common-btn yellow-btn" onClick={Login}>Login</button>
                                                    </div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <p>New User?</p><button type="button" className="common-link auth-link border-0 bg-transparent" onClick={() => handleSwitch("Reg")}>Register Now</button>
                                                    </div>
                                                    <div className="text-center overflow-hidden">
                                                        <div className="field-seprator">OR</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <ul className="p-0 social-list d-flex justify-content-center">
                                                            {/* <li className="google-btn">
                                                                <img src={fb} alt="facebook" />
                                                                <SocialLogin
                                                                    provider='facebook'
                                                                    appId={constants.FACEBOOK_APP_ID}
                                                                    callback={facebookLogin}
                                                                >
                                                                    <Button type="button">  </Button>
                                                                </SocialLogin>
                                                            </li> */}
                                                            <li className="google-btn">
                                                                <img src={gmail} alt="gmail" />
                                                                <GoogleLogin
                                                                    clientId={constants.GOOGLE_CLIENT_ID}
                                                                    buttonText="Log In"
                                                                    onSuccess={responseGoogle}
                                                                    onFailure={responseGoogle}
                                                                    cookiePolicy={'single_host_origin'} />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="text-center">
                                                <p className="small-text">By logging in you accept that you are 18+ and agree to our <a target="_blank" href="https://pokerlion.com/terms-condition.php" rel="noreferrer" className="common-link">Terms and Conditions</a></p>
                                                {/* <p className="small-text">For any kind of queries, contact us on <a href="mailto:support@rummy24.com" className="common-link">support@rummy24.com</a></p> */}
                                            </div>
                                        </div>



                                        {/* Forgot password */}
                                        <div className="forgot-psw-dtl" style={{ "display": switchToForgotPassword ? "block" : "none" }}>
                                            <div className="auth-dtl">
                                                <div className="text-center">
                                                    <img src={logo} alt="logo" />
                                                    <h3 className="text-center">Forgot Password</h3>
                                                </div>
                                                <p className="reset-desc text-center">Please enter your registered Email or Mobile Number to Reset your Password.</p>
                                                <form>
                                                <div className="form-group text-center">
                                                    <div className="radio-list cust-input-list d-flex align-item-center" onChange={(e) => { handleChange(e, 'Radio') }}>
                                                            <label htmlFor="radio" className="d-flex align-items-center">
                                                                <div className="custom-radio">
                                                                    <input id="radio" type="radio" name="gen" value='male' checked
                                                                    />
                                                                    <span></span>
                                                                </div>
                                                                Email
                                                            </label>
                                                            <label htmlFor="radio2" className="d-flex align-items-center">
                                                                <div className="custom-radio">
                                                                    <input id="radio2" type="radio" name="gen"
                                                                        value='female' />
                                                                    <span></span>
                                                                </div>
                                                                Mobile 
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" placeholder="Enter your email" value={emailMobFP} onChange={(e) => handleChange(e, 'ForgotPassword')} />
                                                        <p className="error-text">{errEmailMobFP}</p>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="half-input d-flex">
                                                            <div>
                                                                <input type="text" value="+91" readOnly />
                                                            </div>
                                                            <div>
                                                                <input type="number" onInput={(e) => e.target.value = e.target.value.slice(0, 10)} placeholder="Mobile Number" value={mobileNumberLogin} onChange={(e) => { handleChange(e, 'MobLogin') }} />
                                                                <p className="error-text">{errMobileNumberLogin}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="button" onClick={handleForgotPassword} className="common-btn yellow-btn">SUBMIT</button>
                                                    </div>
                                                </form>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <p>Go back to</p><button type="button" className="common-link auth-link border-0 bg-transparent" onClick={() => handleSwitch("backToLogin")}>Login</button>
                                                </div>
                                            </div>
                                        </div>



                                        {/* OTP Screen */}
                                        <div className="forgot-psw-dtl otp-dtl" style={{ "display": switchToOTP ? "block" : "none" }}>
                                            <div className="auth-dtl">
                                                <div className="text-center">
                                                    <img src={logo} alt="logo" />
                                                    <h3 className="text-center">Verification</h3>
                                                </div>
                                                <p className="reset-desc text-center">Enter the OTP we just sent you</p>
                                                <form onSubmit={(e) => { newPasswordInputShow ? handleOTP(e, 'ResetPassword') : handleOTP(e, 'RegistrationOTP') }}>
                                                    <div className="d-flex justify-content-center">
                                                        <div className="otp-inputs">
                                                            <OtpInput
                                                                inputStyle="inputStyle"
                                                                value={otp}
                                                                onChange={handleChangeOtp}
                                                                numInputs={4}
                                                            />
                                                            <p className="error-text">{errOTP}</p>
                                                            <div className="d-flex justify-content-between align-items-center resend-otp">
                                                                <button type="button" className="common-link auth-link m-0 bg-transparent border-0 disabled" disabled={!resendButtonShow} onClick={handleResendOtp}>Resend OTP?</button>
                                                                {status == STATUS.STARTED ?
                                                                    <>
                                                                        <span className="d-block">{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</span>
                                                                    </>
                                                                    : status
                                                                }
                                                            </div>
                                                            <div className="form-group pass-field" style={{ "display": newPasswordInputShow ? "block" : "none" }}>
                                                                <input onChange={(e) => { handleChange(e, 'ResetPassword') }} value={resetPassword} type={passwordVisibility ? "text" : "password"} placeholder="New Password" />
                                                                <button type="button" className={eyeIcon ? "pass hide border-0 bg-transparent" : "pass border-0 bg-transparent"} onClick={handlePasswordVisibility}></button>
                                                                <p className="error-text">{errResetPassword}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <button type="submit" className="common-btn mb-0 yellow-btn">SUBMIT</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>

                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
            <div className="landing-banner"></div>
            <div className={showConfirmMessage ? "edit-auth-dtl active" : "edit-auth-dtl"}>
                <div>
                    <p><strong>Do you want to change the Email id or Mobile number?</strong></p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Mobile No:</strong> {mobileNumber} </p>
                    <div className="d-flex side-btn justify-content-center">
                        <input type="button" disabled={disableSubmit} className="common-btn yellow-btn small-btn" value="No" onClick={handleRegistration} />
                        <input type="button" className="common-btn yellow-btn small-btn" value="Yes" onClick={handleChangeData} />
                    </div>
                </div>
            </div>


            <div className={showModalCloseConfirmMessage ? "edit-auth-dtl active" : "edit-auth-dtl"}>
                <div>
                    <p><strong>Are you sure you want to discard the changes?</strong></p>
                    <div className="d-flex side-btn justify-content-center">
                        <input type="button" className="common-btn yellow-btn small-btn" value="No" onClick={(e) => handleModalOpen(e)} />
                        <input type="button" className="common-btn yellow-btn small-btn" value="Yes" onClick={(e) => handleModalClose(e)} />
                    </div>
                </div>
            </div>

            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default connect()(AuthHeader);
