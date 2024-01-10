import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import ReportContent from './ReportProblem'

function Withdraw(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <div className="account-container d-flex">
                    <Sidebar {...props} />
                    <ReportContent {...props} />
                </div>
            </div>
        </Fragment>
    )
}
export default connect()(Withdraw)