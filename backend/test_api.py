#!/usr/bin/env python3
"""
Test script for the Alex Meal Planner API
"""
import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_URL = "http://localhost:5001"

def test_health_check():
    """Test the health check endpoint"""
    print("Testing health check endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_config_endpoint():
    """Test the configuration endpoint"""
    print("\nTesting configuration endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/config")
        print(f"Status: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_supported_meals():
    """Test the supported meals endpoint"""
    print("\nTesting supported meals endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/api/meal-plans")
        print(f"Status: {response.status_code}")
        data = response.json()
        if data["status"] == "success":
            print(f"Supported meals count: {len(data['data']['supported_meals'])}")
            print(f"First 3 meals: {data['data']['supported_meals'][:3]}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_meal_plan_generation():
    """Test meal plan generation (requires API keys)"""
    print("\nTesting meal plan generation...")
    
    # Check if API keys are configured
    if not os.getenv('SERPER_API_KEY') or not os.getenv('ANTHROPIC_API_KEY'):
        print("Skipping meal plan generation test - API keys not configured")
        return True
    
    try:
        test_request = {
            "meal_name": "Chicken Stir Fry",
            "servings": 4,
            "budget": "$25",
            "dietary_restrictions": [],
            "cooking_skill": "beginner"
        }
        
        print(f"Request: {json.dumps(test_request, indent=2)}")
        
        response = requests.post(
            f"{BASE_URL}/api/meal-plan",
            json=test_request,
            timeout=120  # Give it 2 minutes to complete
        )
        
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Meal plan generated successfully!")
            print(f"Request info: {data.get('request_info')}")
            # Don't print the full result as it might be very long
            print("Response contains meal plan data")
        else:
            print(f"Error response: {response.json()}")
        
        return response.status_code == 200
        
    except Exception as e:
        print(f"Error: {e}")
        return False

def run_all_tests():
    """Run all API tests"""
    print("=== Alex Meal Planner API Tests ===\n")
    
    tests = [
        ("Health Check", test_health_check),
        ("Configuration", test_config_endpoint),
        ("Supported Meals", test_supported_meals),
        ("Meal Plan Generation", test_meal_plan_generation)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{'='*50}")
        result = test_func()
        results.append((test_name, result))
        print(f"{'✅ PASSED' if result else '❌ FAILED'}: {test_name}")
    
    print(f"\n{'='*50}")
    print("SUMMARY:")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    print(f"Tests passed: {passed}/{total}")
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status}: {test_name}")

if __name__ == "__main__":
    run_all_tests()