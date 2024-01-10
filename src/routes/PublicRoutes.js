/* eslint-disable linebreak-style */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { history } from '../App'

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  const requestedURL = rest.location.state;
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated ? <Redirect to={requestedURL ? history.goBack() : "/lobby"} /> : <Component {...props} />)}
    />
  )
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.elementType.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps, null, null, { pure: false })(PublicRoute)
