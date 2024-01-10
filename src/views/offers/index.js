import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import OffersContent from './offers'

function Offers(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <OffersContent {...props} />
            </div>
        </Fragment>
    )
}
export default connect()(Offers)