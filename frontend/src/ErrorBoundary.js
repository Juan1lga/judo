import React from 'react';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container mt-4">
                    <h1>Error en la aplicación</h1>
                    <p>{this.state.error?.message}</p>
                    <pre>{this.state.error?.stack}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;