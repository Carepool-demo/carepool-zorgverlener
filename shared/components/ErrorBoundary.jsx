import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2 className="error-boundary__title">Er ging iets mis</h2>
            <p className="error-boundary__message">
              Er is een onverwachte fout opgetreden. Probeer het opnieuw.
            </p>
            <button className="error-boundary__btn" onClick={this.handleReset}>
              Opnieuw proberen
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
