import React, { Fragment } from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import PassbookContent from './Passbook'

import { connect } from 'react-redux'

function GameTransactions(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <div className="account-container d-flex">
                    <Sidebar {...props} />
                    <PassbookContent {...props} />
                </div>
            </div>
        </Fragment>
    )
}
export default connect()(GameTransactions)