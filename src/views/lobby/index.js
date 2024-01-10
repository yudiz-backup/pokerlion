import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import LobbyContent from './LobbyDetails'

function Lobby(props) {
    return (
        <Fragment>
            <Header {...props} />
            <LobbyContent {...props} />
        </Fragment>
    )
}
export default connect()(Lobby)