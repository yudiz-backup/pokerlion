import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import BonusContent from './bonus'

function Bonus(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <div className="account-container d-flex">
                    <Sidebar {...props} />
                    <BonusContent {...props} />
                </div>
            </div>
        </Fragment>
    )
}
export default connect()(Bonus)