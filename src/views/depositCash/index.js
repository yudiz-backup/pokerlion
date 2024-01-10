import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import DepositContent from './depositCash'

function Deposit(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <DepositContent {...props} />
            </div>
        </Fragment>
    )
}
export default connect()(Deposit)