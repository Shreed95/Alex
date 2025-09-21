import React, { useState, useEffect } from 'react';

const LoadingSpinner = ({ message = "Creating your personalized meal plan..." }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { text: "Analyzing your preferences", icon: "🤔" },
    { text: "Searching for perfect recipes", icon: "🔍" },
    { text: "Optimizing shopping list", icon: "🛒" },
    { text: "Calculating budget analysis", icon: "💰" },
    { text: "Finalizing your meal plan", icon: "✨" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-xl animate-slideUp">
        {/* Main Spinner */}
        <div className="relative mb-6">
          <div className="spinner-large mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse">{steps[currentStep].icon}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-heading-medium text-neutral-900 mb-2">Creating Your Meal Plan</h3>
        <p className="text-body-medium text-neutral-600 mb-6">{message}</p>

        {/* Progress Steps */}
        <div className="space-y-3">
          <div className="text-body-small text-neutral-500 mb-4">
            {steps[currentStep].text}...
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="text-caption text-neutral-400">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-center gap-2 text-body-small text-blue-700">
            <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Our AI is crafting the perfect meal plan for you</span>
          </div>
        </div>

        <p className="text-caption text-neutral-500 mt-4">
          This usually takes 1-2 minutes
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;