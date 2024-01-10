/* eslint-disable no-prototype-builtins */
import { React, useEffect, useRef, useState } from 'react';
import Select from 'react-select'
import { connect, useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import { Prompt } from "react-router-dom";
import { getSettings } from '../../../actions/account';
import { reportIssue } from '../../../actions/report'
import { verifyLength } from '../../../helper';
import BlackCross from '../../../assets/images/cross.png';
import Loading from '../../../components/Loading';

function ReportProblem() {

    const [issueList, setIssueList] = useState([]);
    const [issueOptions, setIssueOptions] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState('');
    const [fileName, setFileName] = useState([]);
    const [underSize, setUnderSize] = useState(false);
    const [filesUnderSize, setFilesUnderSize] = useState([]);
    const [submitDisable, setSubmitDisable] = useState(false);
    const [cancelDisable, setCancelDisable] = useState(false);
    const [inputDisable, setInputDisable] = useState(false);

    const [errComments, setErrComments] = useState('');
    const [errFileUpload, setErrFileUpload] = useState('');

    const dispatch = useDispatch()
    const gameSettings = useSelector(state => state.account.data)
    const token = useSelector(state => state.auth.token)
    const reportMessage = useSelector(state => state.report.resMessage)
    const reportStatus = useSelector(state => state.report.resStatus)

    const previousProps = useRef({ reportMessage }).current

    useEffect(() => {
        setLoading(true)
        dispatch(getSettings)
        document.title = "PokerLion | My Account"
    }, [])

    useEffect(() => {
        if (previousProps.reportMessage !== reportMessage) {
            if (reportMessage?.length) {
                setInputDisable(false)
                setUnderSize(false)
                toast(
                    <div>
                        <div>{reportMessage === "success" ? "Report submitted successfully" : reportMessage}</div>
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
            previousProps.reportMessage = reportMessage
        }
    }, [reportMessage])

    useEffect(() => {
        if (reportStatus === false) {
            setLoading(false)
            setSelectedOption('')
            setComments('')
            setFilesUnderSize([])
            setInputDisable(false)
            setUnderSize(false)
        }
        if (reportStatus === true) {
            setLoading(false)
            setSelectedOption('')
            setComments('')
            setFilesUnderSize([])
            setInputDisable(false)
            setUnderSize(false)
        }
    }, [reportStatus])

    useEffect(() => {
        if (gameSettings) {
            setLoading(false)
            setIssueList(gameSettings?.aReportDropDown)
        }
    }, [gameSettings])

    useEffect(() => {
        if (issueList?.length) {
            const options = issueList.map(option => ({ label: option, value: option }));
            setIssueOptions(options)
        }
    }, [issueList])

    function handleOptions(e) {
        setSelectedOption(e.value)
    }

    useEffect(() => {
        if (filesUnderSize?.length) {
            window.onbeforeunload = function () {
                return true;
            };
        }

        return () => {
            window.onbeforeunload = null;
        };
    }, [filesUnderSize]);

    function handleFile(e) {
        if (e.target.files?.length <= 4) {
            const fileArray = [...e.target.files]
            let resultArray = fileArray.sort((a, b) => a.size - b.size);

            const valid = resultArray.every(function (arr) { return arr.type.includes('image') || arr.type.includes('video') });
            if (valid) {
                if (resultArray.map(file => {
                    if (file.type.includes("video")) {
                        if (file?.size > 15728640) {
                            setErrFileUpload("Video size must be less than 15 MB")
                            setUnderSize(false)
                        } else {
                            setUnderSize(true)
                        }
                    }
                    if (file.type.includes("image")) {
                        if (file?.size > 1048576) {
                            setErrFileUpload("Image size must be less than 1 MB")
                            setUnderSize(false)
                        } else {
                            setUnderSize(true)
                        }
                    }
                }
                ))
                    setFileName(fileArray)
            } else {
                setUnderSize(false)
                setInputDisable(false)
                setErrFileUpload("Please select Image(s) or Video(s)")
            }

        }
        else {
            e.preventDefault();
            setErrFileUpload("Please select only 4 files")
        }
    }

    useEffect(() => {
        if (underSize === true) {
            setErrFileUpload('')
            setInputDisable(true)
            setFilesUnderSize(fileName)
        }
    }, [underSize])

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const formdata = new FormData()
        formdata.append('sTitle', selectedOption)
        formdata.append('sDescription', comments)
        filesUnderSize?.length && formdata.append('aMedia', filesUnderSize)
        dispatch(reportIssue(formdata, token))
    }

    function handleComments(e) {
        if (verifyLength(e.target.value, 1)) {
            setErrComments('')
        } else if (!verifyLength(e.target.value, 1)) {
            setErrComments('Please describe the issue you have been facing')
        }
        setComments(e.target.value)
    }

    useEffect(() => {
        if (selectedOption?.length && comments?.length && !errComments && !errFileUpload) {
            setSubmitDisable(true)
        } else {
            setSubmitDisable(false)
        }
    }, [selectedOption, comments, errFileUpload])

    useEffect(() => {
        if (selectedOption?.length || comments?.length || filesUnderSize?.length) {
            setCancelDisable(true)
        } else {
            setCancelDisable(false)
        }
    }, [selectedOption, comments, filesUnderSize])

    function handleCancel() {
        setSelectedOption('')
        setComments('')
        setFilesUnderSize([])
        setErrComments('')
        setErrFileUpload('')
        setUnderSize(false)
        setInputDisable(false)
    }

    function handleRemoveMedia() {
        setFilesUnderSize([])
        setErrFileUpload('')
        setUnderSize(false)
        setInputDisable(false)
    }

    function handleRemoveIndividualMedia(nameID) {
        const filteredFiles = filesUnderSize.filter(item => item.name !== nameID);
        setFilesUnderSize(filteredFiles)
        if (filteredFiles?.length === 0) {
            setInputDisable(false)
            setFilesUnderSize([])
            setUnderSize(false)
        }
    }
    return (
        <>
            {loading && <Loading />}
            <Prompt
                when={!!filesUnderSize?.length}
                message='Data will be lost if you leave the page, are you sure?'
            />
            <div className="account-cnt">
                <div className="change-psw-section">
                    <h3 className="text-center account-title">Report Problem</h3>
                    <div className="row">
                        <div className="offset-md-2 col-md-8 offset-lg-2 col-lg-8 offset-xxl-3 col-xxl-6">
                            <div className="kyc-body table-cnt-box bank-details br-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group pass-field">
                                        <label className="label">Issue Title</label>
                                        <Select
                                            options={issueOptions}
                                            placeholder='Select an Issue'
                                            onChange={(e) => handleOptions(e)}
                                            value={issueOptions?.length && issueOptions.filter(function (option) {
                                                return option.value === selectedOption;
                                            })}
                                        />
                                    </div>
                                    <div className="form-group pass-field">
                                        <label className="label">Comments</label>
                                        <textarea placeholder="Enter Message" maxLength="500" value={comments} onChange={handleComments} ></textarea>
                                        <p className="error-text">{errComments}</p>
                                    </div>
                                    <div className="form-group pass-field">
                                        <label className="label">Attachments</label>
                                        <div className="d-flex justify-content-end mb-1">
                                            <button type="button" onClick={handleRemoveMedia} className={filesUnderSize?.length ? "p-0 border-0 bg-transparent" : 'd-none'}>
                                                <img src={BlackCross} alt="removeMedia" />
                                            </button>
                                        </div>
                                        <div className="problem-attach text-center">
                                            <input type="file" disabled={inputDisable} multiple accept="image/*,video/*" onChange={(e) => handleFile(e)} onClick={(e) => {
                                                e.target.value = null
                                            }} />
                                            {filesUnderSize?.length ?
                                                filesUnderSize.map((file, i) =>
                                                    <>
                                                        <p key={i} className="medium-text gray-text">{file.name}</p>
                                                        <button onClick={() => handleRemoveIndividualMedia(file.name)} type="button" className="p-0 border-0 bg-transparent">
                                                            <img src={BlackCross} alt="removeMedia" />
                                                        </button>
                                                        <br /><br />
                                                    </>
                                                )
                                                :
                                                <p className="medium-text gray-text">Drop your file(s) here or <span className="common-link fw-bold">Browse</span></p>
                                            }
                                        </div>
                                        <p className="error-text">{errFileUpload}</p>
                                    </div>
                                    <div className="text-center side-btn">
                                        <button disabled={!submitDisable} type="submit" className="common-btn yellow-btn small-btn">submit</button>
                                        <button type="button" onClick={handleCancel} disabled={!cancelDisable} className="common-btn yellow-btn small-btn">cancel</button>
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

export default connect()(ReportProblem);
