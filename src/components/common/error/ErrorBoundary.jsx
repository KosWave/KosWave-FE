import React, { Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage"; // ErrorPage 컴포넌트를 import 합니다.

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasError && !prevState.hasError) {
      localStorage.removeItem("error");
      this.props.navigate("/error", { state: { from: this.props.location } });
    }
  }

  render() {
    return this.props.children;
  }
}

function ErrorBoundaryWrapper(props) {
  const navigate = useNavigate();
  const location = useLocation();
  return <ErrorBoundary {...props} navigate={navigate} location={location} />;
}

export default ErrorBoundaryWrapper;
