import { React, useState, useRef, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { changePasswordRequest } from '../../../actions/changePassword';
import { verifyLength, verifyPassword } from '../../../helper';
import Loading from '../../../components/Loading';
import { logoutDuetoPasswordChange } from '../../../actions/auth';

function changePassword() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(false)
    const [currentPasswordEyeIcon, setCurrentPasswordEyeIcon] = useState(false)
    const [newPasswordVisibility, setNewPasswordVisibility] = useState(false)
    const [newPasswordEyeIcon, setNewPasswordEyeIcon] = useState(false)
    const [confirmNewPasswordVisibility, setConfirmNewPasswordVisibility] = useState(false)
    const [confirmNewPasswordEyeIcon, setconfirmNewPasswordEyeIcon] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [errCurrentPassword, setErrCurrentPassword] = useState('');
    const [errNewPassword, setErrNewPassword] = useState('');
    const [errConfirmNewPassword, setErrConfirmNewPassword] = useState('');

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const resMessage = useSelector(state => state.changePassword.resMessage)
    const resStatus = useSelector(state => state.changePassword.resStatus)

    const previousProps = useRef({ resMessage, resStatus }).current

    useEffect(() => {
        if (previousProps.resMessage !== resMessage) {
            if (resMessage?.length) {
                toast(
                    <div>
                        <div>{resMessage !== "success" ? resMessage : "Success, Logging you out"}</div>
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
            previousProps.resMessage = resMessage
        }
    }, [resMessage])

    useEffect(() => {
        document.title = "PokerLion | My Account"
    }, [])

    useEffect(() => {
        if (previousProps.resStatus !== resStatus) {
            if (resStatus === true) {
                localStorage.removeItem('Token')
                localStorage.removeItem('favouritePointPractice')
                localStorage.removeItem('favouritePoolPractice')
                localStorage.removeItem('favouriteDealPractice')
                localStorage.removeItem('favouritePointCash')
                localStorage.removeItem('favouritePoolCash')
                localStorage.removeItem('favouriteDealCash')
                setLoading(false)
                setCurrentPassword('')
                setNewPassword('')
                setConfirmNewPassword('')
            }
            if (resStatus === false) {
                setLoading(false)
                setNewPassword('')
                setConfirmNewPassword('')
            }
        }
        return () => {
            previousProps.resStatus = resStatus
        }
    }, [resStatus])

    useEffect(() => {
        if (previousProps.resStatus !== resStatus) {
            if (resStatus === true) {
                const timer = setTimeout(() => {
                    dispatch(logoutDuetoPasswordChange())
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
        return () => {
            previousProps.resStatus = resStatus
        }
    }, [resStatus])

    function handlePassword(e, type) {
        switch (type) {
            case 'current':
                if (verifyPassword(e.target.value)) {
                    setErrCurrentPassword('')
                } else if (!verifyLength(e.target.value, 1)) {
                    setErrCurrentPassword('Enter your current password')
                }
                else {
                    setErrCurrentPassword('It must contain minimum 6 characters')
                }
                if (newPassword?.length && e.target.value == newPassword) {
                    setErrNewPassword("Current password and new password can't be same")
                } else {
                    setErrNewPassword('')
                }
                setCurrentPassword(e.target.value)
                break
            case 'new':
                if (verifyPassword(e.target.value)) {
                    setErrNewPassword('')
                } else if (!verifyLength(e.target.value, 1)) {
                    setErrNewPassword('Enter new password')
                }
                else {
                    setErrNewPassword('It must contain minimum 6 characters')
                }
                if (currentPassword == e.target.value) {
                    setErrNewPassword("Current password and new password can't be same")
                }

                if (confirmNewPassword?.length && e.target.value != confirmNewPassword) {
                    setErrConfirmNewPassword("Passwords don't match")
                } else {
                    setErrConfirmNewPassword("")
                }
                setNewPassword(e.target.value)
                break
            case 'confirmNew':
                if (verifyPassword(e.target.value) && newPassword == e.target.value) {
                    setErrConfirmNewPassword('')
                } else if (!verifyLength(e.target.value, 1)) {
                    setErrConfirmNewPassword('Enter new password again')
                }
                else if (newPassword != e.target.value) {
                    setErrConfirmNewPassword("Passwords don't match")
                }
                setConfirmNewPassword(e.target.value)
                break
        }
    }

    useEffect(() => {
        if (currentPassword?.length && newPassword?.length && confirmNewPassword?.length && !errCurrentPassword && !errNewPassword && !errConfirmNewPassword) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [currentPassword, newPassword, confirmNewPassword])


    function handlePasswordVisibility(type) {
        switch (type) {
            case 'current':
                setCurrentPasswordEyeIcon(currentPasswordEyeIcon => !currentPasswordEyeIcon)
                setCurrentPasswordVisibility(currentPasswordVisibility => !currentPasswordVisibility)
                break
            case 'new':
                setNewPasswordEyeIcon(newPasswordEyeIcon => !newPasswordEyeIcon)
                setNewPasswordVisibility(newPasswordVisibility => !newPasswordVisibility)
                break
            case 'confirmNew':
                setconfirmNewPasswordEyeIcon(confirmNewPasswordEyeIcon => !confirmNewPasswordEyeIcon)
                setConfirmNewPasswordVisibility(confirmNewPasswordVisibility => !confirmNewPasswordVisibility)
                break
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        dispatch(changePasswordRequest(currentPassword, newPassword, token))
    }

    return (
        <>
            {loading && <Loading />}
            <div className="account-cnt">
                <div className="change-psw-section">
                    <h3 className="text-center account-title">Change Password</h3>
                    <div className="row">
                        <div className="offset-md-2 col-md-8 offset-lg-2 col-lg-8 offset-xxl-3 col-xxl-6">
                            <div className="kyc-body table-cnt-box bank-details br-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group pass-field label-field">
                                        <label className="label">Current Password</label>
                                        <input type={currentPasswordVisibility ? "text" : "password"} value={currentPassword} onChange={(e) => handlePassword(e, 'current')} />
                                        <button type="button" className={currentPasswordEyeIcon ? "pass hide border-0 bg-transparent" : "pass border-0 bg-transparent"} onClick={() => handlePasswordVisibility('current')}></button>
                                        <p className="error-text">{errCurrentPassword}</p>
                                        {/* <a className="pass" href="/"></a> */}
                                    </div>
                                    <div className="form-group pass-field label-field">
                                        <label className="label">New Password</label>
                                        <input type={newPasswordVisibility ? "text" : "password"} value={newPassword} onChange={(e) => handlePassword(e, 'new')} />
                                        <button type="button" className={newPasswordEyeIcon ? "pass hide border-0 bg-transparent" : "pass border-0 bg-transparent"} onClick={() => handlePasswordVisibility('new')}></button>
                                        <p className="error-text">{errNewPassword}</p>
                                        {/* <a className="pass" href="/"></a> */}
                                    </div>
                                    <div className="form-group pass-field label-field">
                                        <label className="label">Confirm New Password</label>
                                        <input type={confirmNewPasswordVisibility ? "text" : "password"} value={confirmNewPassword} onChange={(e) => handlePassword(e, 'confirmNew')} />
                                        <button type="button" className={confirmNewPasswordEyeIcon ? "pass hide border-0 bg-transparent" : "pass border-0 bg-transparent"} onClick={() => handlePasswordVisibility('confirmNew')}></button>
                                        <p className="error-text">{errConfirmNewPassword}</p>
                                        {/* <a className="pass" href="/"></a> */}
                                    </div>
                                    <div className="text-center">
                                        <button disabled={!disableSubmit} type="submit" className="common-btn yellow-btn small-btn">submit</button>
                                    </div>
                                </form>
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

export default connect()(changePassword);
