const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Get API configuration
  async getConfig() {
    return this.request('/api/config');
  }

  // Get supported meals
  async getSupportedMeals() {
    return this.request('/api/meal-plans');
  }

  // Generate meal plan
  async generateMealPlan(mealPlanRequest) {
    return this.request('/api/meal-plan', {
      method: 'POST',
      body: JSON.stringify(mealPlanRequest),
    });
  }
}

export const apiService = new ApiService();
export default apiService;