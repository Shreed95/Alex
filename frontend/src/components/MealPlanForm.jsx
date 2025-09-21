import React, { useState } from 'react';

const MealPlanForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    meal_name: '',
    servings: 4,
    budget: '',
    dietary_restrictions: [],
    cooking_skill: 'beginner'
  });

  const mealOptions = [
    'Chicken Stir Fry', 'Paneer Butter Masala', 'Pasta Carbonara',
    'Beef Tacos', 'Vegetarian Pizza', 'Salmon Teriyaki',
    'Thai Green Curry', 'Mediterranean Bowl', 'Chicken Tikka Masala',
    'Caesar Salad with Grilled Chicken'
  ];

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
    { id: 'vegan', label: 'Vegan', emoji: '🌱' },
    { id: 'gluten-free', label: 'Gluten-Free', emoji: '🌾' },
    { id: 'dairy-free', label: 'Dairy-Free', emoji: '🥛' },
    { id: 'nut-free', label: 'Nut-Free', emoji: '🥜' },
    { id: 'low-carb', label: 'Low-Carb', emoji: '🥩' },
    { id: 'keto', label: 'Keto', emoji: '🥑' }
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', emoji: '👶', time: '<30 min' },
    { value: 'intermediate', label: 'Intermediate', emoji: '👨‍🍳', time: '30-60 min' },
    { value: 'advanced', label: 'Advanced', emoji: '👨‍🔬', time: '60+ min' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.meal_name && formData.budget) onSubmit(formData);
  };

  const handleDietaryChange = (restriction) => {
    setFormData(prev => ({
      ...prev,
      dietary_restrictions: prev.dietary_restrictions.includes(restriction)
        ? prev.dietary_restrictions.filter(r => r !== restriction)
        : [...prev.dietary_restrictions, restriction]
    }));
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Create Your Meal Plan</h2>
        <p className="text-center text-gray-600 mb-12">Provide your preferences and our AI will generate a personalized meal plan.</p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Meal Selection */}
          <div>
            <label className="block font-medium text-gray-800 mb-3">Choose a Meal</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {mealOptions.map(meal => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, meal_name: meal }))}
                  className={`p-4 rounded-lg border transition-colors duration-200 text-left ${formData.meal_name === meal ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'}`}
                >
                  {meal}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or enter your own meal..."
              value={formData.meal_name}
              onChange={e => setFormData(prev => ({ ...prev, meal_name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Servings & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-800 mb-2">Servings</label>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, servings: Math.max(1, prev.servings-1) }))} className="px-3 py-1 bg-gray-200 rounded">−</button>
                <span className="font-semibold text-gray-900">{formData.servings}</span>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, servings: Math.min(12, prev.servings+1) }))} className="px-3 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-800 mb-2">Budget</label>
              <input
                type="text"
                placeholder="$25 - $50"
                value={formData.budget}
                onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Cooking Skill */}
          <div>
            <label className="block font-medium text-gray-800 mb-3">Cooking Skill</label>
            <div className="flex gap-4">
              {skillLevels.map(skill => (
                <button
                  key={skill.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, cooking_skill: skill.value }))}
                  className={`p-4 border rounded-lg transition-colors duration-200 flex-1 text-center ${formData.cooking_skill === skill.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 hover:border-blue-400'}`}
                >
                  <div className="text-2xl mb-1">{skill.emoji}</div>
                  <div className="font-semibold">{skill.label}</div>
                  <div className="text-sm text-gray-500">{skill.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block font-medium text-gray-800 mb-3">Dietary Preferences</label>
            <div className="flex flex-wrap gap-3">
              {dietaryOptions.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleDietaryChange(option.id)}
                  className={`px-3 py-1 rounded-full border transition-colors duration-200 ${formData.dietary_restrictions.includes(option.id) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'}`}
                >
                  <span className="mr-1">{option.emoji}</span>{option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading || !formData.meal_name || !formData.budget}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Your Meal Plan...' : 'Create My Meal Plan'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MealPlanForm;