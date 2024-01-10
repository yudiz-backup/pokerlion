import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import InviteContent from './Invite'

function Invite(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <div className="account-container d-flex">
                    <Sidebar {...props} />
                    <InviteContent {...props} />
                </div>
            </div>
        </Fragment>
    )
}
export default connect()(Invite)