import React from 'react';

const ErrorMessage = ({ error, onRetry, onClose }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="card card-padding-lg text-center animate-slideUp">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h3 className="text-heading-large text-neutral-900 mb-3">Something went wrong</h3>
            <p className="text-body-medium text-neutral-600 mb-8">
              We encountered an issue while creating your meal plan. Don't worry, we can fix this together.
            </p>
            
            {/* Error Details */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
              <div className="text-caption font-medium text-red-800 mb-2">Error Details:</div>
              <code className="text-body-small text-red-700 bg-red-100 px-2 py-1 rounded font-mono">
                {error}
              </code>
            </div>

            {/* Troubleshooting */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-8 text-left">
              <h4 className="text-body-medium font-semibold text-neutral-900 mb-4">Common solutions:</h4>
              <ul className="space-y-2 text-body-small text-neutral-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Backend server might not be running (port 5001)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>API keys may not be configured properly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Network connection might be unstable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Service might be temporarily unavailable</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onRetry} className="btn btn-primary btn-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
              <button onClick={onClose} className="btn btn-secondary btn-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center gap-2 text-body-small text-blue-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span><strong>Need help?</strong> Check that your backend server is running and configured properly.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorMessage;