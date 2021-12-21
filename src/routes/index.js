import React, { useEffect, useLayoutEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  withRouter,
  useLocation,
} from 'react-router-dom'
import 'react-notifications/lib/notifications.css'
import { useSelector } from 'react-redux'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import AppContainer from '../AppContainer'
import ErrorBoundary from '../components/common/error-boundary'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { Home } from '../pages'

const Routes = (props) => {
  const alert = useSelector((state) => state.alert)
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const { type, message } = alert
    if (type && message) {
      NotificationManager[type](message)
    }
  }, [alert])

  return (
    <div>
      <Switch>
        <PublicRoute exact path='/' component={Home} />
        <PublicRoute path='/home' component={Home} />
      </Switch>
    </div>
  )
}

const RoutesHistory = withRouter(Routes)

const routing = function createRouting() {
  return (
    <>
      <Router>
        <AppContainer>
          <ErrorBoundary>
            <RoutesHistory />
          </ErrorBoundary>
        </AppContainer>
      </Router>
    </>
  )
}

export default routing
