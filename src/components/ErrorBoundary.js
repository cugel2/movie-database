import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error details to an error reporting service here
    console.log(error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI here
      return (
        <div>
          <h2>Something went wrong.</h2>
          {/* You can display more details if needed */}
          {/* <details>
            {this.state.errorInfo && this.state.errorInfo.toString()}
          </details> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
