import React, { Fragment } from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import TournamentTransaction from './TournamentTransaction'

import { connect } from 'react-redux'

function GameTransactions(props) {
    return (
        <Fragment>
            <div>
                <Header {...props} />
                <div className="account-container d-flex">
                    <Sidebar {...props} />
                    <TournamentTransaction {...props} />
                </div>
            </div>
        </Fragment>
    )
}
export default connect()(GameTransactions)