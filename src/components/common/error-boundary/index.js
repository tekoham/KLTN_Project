import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error, errorInfo) {
    const { history } = this.props
    this.setState({
      hasError: true,
    })
    history.push({
      pathname: '/error',
      state: { hasError: true },
    })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default withRouter(ErrorBoundary)
