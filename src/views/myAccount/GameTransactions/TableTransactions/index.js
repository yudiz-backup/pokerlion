import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../../../components/Header'
import Sidebar from '../../../../components/Sidebar'
import TableTransaction from './TableTransaction'

function TableTransactions(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <div className="account-container d-flex">
                    <Sidebar {...props} />
                    <TableTransaction {...props} />
                </div>
            </div>
        </Fragment>
    )
}
export default connect()(TableTransactions)