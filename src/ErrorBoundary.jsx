// src/ErrorBoundary.js
class ErrorBoundary extends React.Component {
    state = { hasError: false };
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      logErrorToService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <FallbackUI />;
      }
      return this.props.children;
    }
  }