import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'

import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { data } = useSelector((state) => state.user)
  const { location } = useHistory()
  const checkLocation = () => {
    if (location.pathname.includes('create')) {
      return '/create'
    } else if (location.pathname.includes('edit')) {
      return '/edit-profile'
    } else return '/'
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !data?.account ? (
          <Redirect
            to={{ pathname: '/connect', state: { from: checkLocation() } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
