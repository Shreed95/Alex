import os
import warnings
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from models import MealPlanRequest, GroceryShoppingPlan, MealPlan
from crew_service import AlexCrewService
import logging

# Suppress Pydantic deprecation warnings from third-party packages
warnings.filterwarnings("ignore", message=".*Using extra keyword arguments on `Field` is deprecated.*", category=UserWarning)

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize CrewAI service
crew_service = AlexCrewService()

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Alex Meal Planner API is running"})

@app.route('/api/meal-plan', methods=['POST'])
def generate_meal_plan():
    """Generate a complete meal plan with shopping list and budget analysis"""
    try:
        # Validate request data
        if not request.json:
            return jsonify({"error": "Request body must be JSON"}), 400
        
        # Parse and validate request
        try:
            meal_request = MealPlanRequest(**request.json)
        except Exception as e:
            return jsonify({"error": f"Invalid request data: {str(e)}"}), 400
        
        # Check required environment variables
        if not os.getenv('SERPER_API_KEY'):
            return jsonify({"error": "SERPER_API_KEY not configured"}), 500
        
        if not os.getenv('GEMINI_API_KEY'):
            return jsonify({"error": "GEMINI_API_KEY not configured"}), 500
        
        logger.info(f"Generating meal plan for: {meal_request.meal_name}")
        
        # Generate meal plan using CrewAI
        result = crew_service.generate_meal_plan(meal_request)
        
        logger.info("Meal plan generation completed successfully")
        
        return jsonify({
            "status": "success",
            "data": result,
            "request_info": {
                "meal_name": meal_request.meal_name,
                "servings": meal_request.servings,
                "budget": meal_request.budget,
                "dietary_restrictions": meal_request.dietary_restrictions,
                "cooking_skill": meal_request.cooking_skill
            }
        })
        
    except Exception as e:
        logger.error(f"Error generating meal plan: {str(e)}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

@app.route('/api/meal-plans', methods=['GET'])
def get_supported_meals():
    """Get list of supported meal types (for frontend reference)"""
    supported_meals = [
        "Chicken Stir Fry",
        "Paneer Butter Masala",
        "Pasta Carbonara",
        "Beef Tacos",
        "Vegetarian Pizza",
        "Salmon Teriyaki",
        "Thai Green Curry",
        "Mediterranean Bowl",
        "Chicken Tikka Masala",
        "Caesar Salad with Grilled Chicken"
    ]
    
    return jsonify({
        "status": "success",
        "data": {
            "supported_meals": supported_meals,
            "cooking_skills": ["beginner", "intermediate", "advance"],
            "common_dietary_restrictions": [
                "vegetarian",
                "vegan", 
                "gluten-free",
                "dairy-free",
                "nut-free",
                "low-carb",
                "keto"
            ]
        }
    })

@app.route('/api/config', methods=['GET'])
def get_config():
    """Get API configuration status"""
    return jsonify({
        "status": "success",
        "data": {
            "serper_configured": bool(os.getenv('SERPER_API_KEY')),
            "anthropic_configured": bool(os.getenv('ANTHROPIC_API_KEY')),
            "api_version": "1.0.0",
            "supported_features": [
                "meal_planning",
                "shopping_list_generation",
                "budget_analysis",
                "leftover_management"
            ]
        }
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    # Check environment variables on startup
    if not os.getenv('SERPER_API_KEY'):
        logger.warning("SERPER_API_KEY not set - search functionality may not work")
    
    if not os.getenv('GEMINI_API_KEY'):
        logger.warning("GEMINI_API_KEY not set - AI functionality may not work")
    
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    logger.info(f"Starting Alex Meal Planner API on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)