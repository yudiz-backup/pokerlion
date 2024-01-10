import React, { Fragment } from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import MyProfileContent from './MyProfile'
import { connect } from 'react-redux'

function MyProfile(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <div className="account-container d-flex">
                    <Sidebar {...props} />
                    <MyProfileContent {...props} />
                </div>
            </div>
        </Fragment>
    )
}
export default connect()(MyProfile)