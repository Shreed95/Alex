import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";

const MealPlanResults = ({ results, onStartNew }) => {
  const [activeTab, setActiveTab] = useState('summary');

  if (!results) return null;

  const tabs = [
    { id: 'summary', label: 'Summary', icon: '📝' },
    { id: 'shopping', label: 'Shopping List', icon: '🛒' },
    { id: 'budget', label: 'Budget', icon: '💰' },
    { id: 'leftovers', label: 'Leftovers', icon: '♻️' },
  ];

  const renderTabContent = () => {
    const taskOutputs = results.data?.task_outputs || {};

    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Meal Plan Summary</h3>
              <ReactMarkdown>{results.data?.summary || 'No summary available.'}</ReactMarkdown>
            </div>
            {taskOutputs.meal_planning && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Meal Details</h4>
                <p className="text-gray-700">{taskOutputs.meal_planning.meal_name}</p>
                <p className="text-gray-600 text-sm">Servings: {taskOutputs.meal_planning.servings}</p>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  {taskOutputs.meal_planning.researched_ingredients?.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'shopping':
        const shopping = taskOutputs.shopping;
        if (!shopping) return <p className="text-gray-600">Shopping list not available.</p>;
        return (
          <div className="space-y-4">
            {shopping.shopping_sections?.map((section, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">{section.section_name} - {section.estimated_total}</h4>
                <ul className="list-disc pl-5 text-gray-700">
                  {section.items?.map((item, itemIdx) => (
                    <li key={itemIdx}>{item.name} ({item.quantity}) - {item.estimated_price}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case 'budget':
        return (
          <div className="bg-green-50 rounded-lg p-6">
           <ReactMarkdown>{taskOutputs.budget || "Budget data not available."}</ReactMarkdown>
          </div>
        );

      case 'leftovers':
        return (
          <div className="bg-purple-50 rounded-lg p-6">
            <ReactMarkdown>{taskOutputs.leftover || 'Leftover data not available.'}</ReactMarkdown>
          </div>
        );

      default:
        return <p>Content not available</p>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Your Personalized Meal Plan</h2>
        <p className="text-gray-600 mt-2">Everything you need to cook with confidence</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex justify-center space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 font-medium text-sm transition-colors duration-200 rounded-t-lg ${
                activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow p-6 min-h-[300px]">
        {renderTabContent()}
      </div>

      {/* Actions */}
      <div className="text-center mt-6 space-x-4">
        <button onClick={onStartNew} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Plan Another Meal</button>
        <button onClick={() => window.print()} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Print Plan</button>
      </div>
    </div>
  );
};

export default MealPlanResults;
