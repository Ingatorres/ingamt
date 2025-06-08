// src/components/ErrorBoundary.jsx
import React from 'react';

/**
 * @class ErrorBoundary
 * @extends React.Component
 * @description
 * This component acts as an Error Boundary for its children.
 * It catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * This prevents the entire application from crashing and helps in debugging.
 */
class ErrorBoundary extends React.Component {
  /**
   * @property {object} state - Component's internal state.
   * @property {boolean} state.hasError - Flag to indicate if an error has occurred.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @static
   * @method getDerivedStateFromError
   * @param {Error} error - The error that was thrown.
   * @returns {object} An update to the state that will be applied to the component.
   * @description
   * This static method is called after an error has been thrown by a descendant component.
   * It returns an object to update the state, triggering the fallback UI.
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  /**
   * @method componentDidCatch
   * @param {Error} error - The error that was thrown.
   * @param {object} errorInfo - An object with a componentStack key containing information about the component that threw the error.
   * @description
   * This method is called after an error has been thrown by a descendant component.
   * It's used for side effects like logging errors to an error reporting service.
   */
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  /**
   * @method render
   * @returns {React.Node} The component's rendered output.
   * @description
   * Renders the fallback UI if an error has been caught, otherwise renders its children.
   */
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger p-3 my-3 rounded-lg shadow-sm text-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <span className="fw-bold">
            Se produjo un error al cargar esta sección. Por favor, inténtelo de nuevo más tarde o contacte al soporte.
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
