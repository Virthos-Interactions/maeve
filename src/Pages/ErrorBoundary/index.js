import React from 'react';
import './style.css';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
  }

  goToDashboard() {

    return;
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='error-screen-container'>
          <p className='error-message'>Ocorreu um erro inesperado :(</p>
          <a href="http://localhost:3001/">Retornar a página inicial.</a>
        </div>
      );
    }

    return this.props.children;
  }
}