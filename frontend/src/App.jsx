import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MealPlanForm from './components/MealPlanForm';
import MealPlanResults from './components/MealPlanResults';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { apiService } from './services/api';

const App = () => {
  const [currentView, setCurrentView] = useState('hero'); // 'hero', 'form', 'results'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mealPlanResults, setMealPlanResults] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const status = await apiService.healthCheck();
      setApiStatus(status);
    } catch (error) {
      console.log('Backend not available:', error);
      setApiStatus({ status: 'offline' });
    }
  };

  const handleGetStarted = () => {
    setCurrentView('form');
    setError(null);
  };

  const handleMealPlanSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiService.generateMealPlan(formData);
      setMealPlanResults(result);
      setCurrentView('results');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNew = () => {
    setCurrentView('form');
    setMealPlanResults(null);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
    checkApiStatus();
  };

  const handleCloseError = () => {
    setError(null);
    setCurrentView('hero');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {loading && <LoadingSpinner message="This may take a minute while our AI creates your personalized meal plan..." />}
      
      {error && (
        <ErrorMessage 
          error={error} 
          onRetry={handleRetry}
          onClose={handleCloseError}
        />
      )}
      
      {!error && (
        <>
          {currentView === 'hero' && (
            <>
              <Hero onGetStarted={handleGetStarted} />
            </>
          )}
          
          {currentView === 'form' && (
            <MealPlanForm 
              onSubmit={handleMealPlanSubmit} 
              loading={loading}
            />
          )}
          
          {currentView === 'results' && mealPlanResults && (
            <MealPlanResults 
              results={mealPlanResults}
              onStartNew={handleStartNew}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;