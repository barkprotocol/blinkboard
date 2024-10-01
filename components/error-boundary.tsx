import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p className="mt-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
